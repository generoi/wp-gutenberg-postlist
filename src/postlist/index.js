import './style.scss';
import './editor.scss';

const { __, sprintf } = wp.i18n;
const { registerBlockType, InspectorControls } = wp.blocks;
const { Fragment } = wp.element;
const { RangeControl, ServerSideRender, QueryControls } = wp.components;

const postTypes = window._gutenberg_postlist.posttypes;

const edit = (postType) => {
  return (props) => {
    const { attributes, setAttributes } = props;
    const { columns, order, orderBy, postsToShow } = attributes;
    setAttributes({ postType });

    const controls = (
      <InspectorControls>
        <QueryControls
          { ...{ order, orderBy } }
          numberOfItems={ postsToShow }
          onOrderChange={ ( value ) => setAttributes( { order: value } ) }
          onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
          onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
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
        <ServerSideRender
          block={ `genero/postlist-${postType}` }
          attributes={ attributes }
        />
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
