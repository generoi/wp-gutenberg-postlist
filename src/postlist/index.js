import './style.scss';
import './editor.scss';
import CustomServerSideRender from './CustomServerSideRender';

const { __, sprintf } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RangeControl, SelectControl, QueryControls } = wp.components;
const { InspectorControls, RichText } = wp.editor;

const postTypes = window._gutenberg_postlist.posttypes;

const initMasonry = (node) => {
  const el = jQuery(node).find('.js-masonry');
  if (el.length && !el.data('masonry')) {
    const data = el.data('masonry-options') || {};
    window.setTimeout(() => el.masonry(data), 1000);
  }
}

const edit = (postType) => {
  return (props) => {
    const { attributes, setAttributes, isSelected } = props;
    const { title, archiveLinkText, columns, layout, order, orderBy, postsToShow } = attributes;

    const layoutOptions = [
      { value: 'grid', label: __('grid') },
      { value: 'masonry', label: __('masonry') },
      { value: 'featured', label: __('featured') },
    ];

    const controls = (
      <InspectorControls>
        <QueryControls
          { ...{ order, orderBy } }
          numberOfItems={ postsToShow }
          onOrderChange={ ( value ) => setAttributes( { order: value } ) }
          onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
          onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
        />
        <SelectControl
          key="layout-input"
          label={ __('Layout') }
          value={ layout }
          onChange={ (value) => setAttributes({ layout: value }) }
          options={ layoutOptions }
        />
        <RangeControl
          key="columns-input"
          label={ __('Columns') }
          value={ columns }
          onChange={ (value) => setAttributes({ columns: value }) }
          min={ 1 }
          max={ 4 }
        />
      </InspectorControls>
    );

    return (
      <Fragment>
        { controls }
        { title || isSelected ? (
          <RichText
            key="title-input"
            format="string"
            tagName="h3"
            keepPlaceholderOnFocus="true"
            autocompleters={ [] }
            style={ { textAlign: 'center' } }
            value={ title }
            onChange={ value => setAttributes({ title: value }) }
            placeholder={ __('Write heading…') }
          />
        ) : null }
        <CustomServerSideRender
          block={ `genero/postlist-${postType}` }
          attributes={ { columns, layout, order, orderBy, postsToShow } }
          onUpdate={ initMasonry }
        />
        { !!archiveLinkText || isSelected ? (
          <div className="wp-block-genero-postlist__archivelink_wrapper">
            <RichText
              key="archivelink-input"
              format="string"
              tagName="div"
              className="wp-block-genero-postlist__archivelink"
              keepPlaceholderOnFocus
              value={ archiveLinkText }
              onChange={ value => setAttributes({ archiveLinkText: value }) }
              placeholder={ __('Link to archive…') }
            />
          </div>
        ) : null }
      </Fragment>
    );
  };
};

Object.keys(postTypes).forEach((postType) => {
  const options = postTypes[postType];

  registerBlockType(`genero/postlist-${postType}`, {
    title: sprintf(__('%s listing'), options.label),
    icon: options.icon || 'admin-page',
    category: 'embed',

    supports: Object.assign({
      align: ['center', 'wide', 'full'],
    }, options.supports || {}),

    keywords: [
      __('list'),
    ].concat(options.keywords || []),

    edit: edit(postType),

    save: () => {
      return null;
    },
  });
});
