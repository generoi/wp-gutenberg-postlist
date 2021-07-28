import CustomServerSideRender from './CustomServerSideRender';

import { __ } from '@wordpress/i18n';
import { Fragment, createRef, findDOMNode } from '@wordpress/element';
import { RangeControl, SelectControl, QueryControls } from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { withSelect, select, subscribe } from '@wordpress/data';
import { stringify } from 'querystringify';

function edit(props) {
  const { attributes, setAttributes, isSelected, categoriesList } = props;
  const { title, archiveLinkText, columns, layout, order, orderBy, postsToShow, categories } = attributes;

  const layoutOptions = [
    { value: 'grid', label: __('grid', 'wp-gutenberg-postlist') },
    { value: 'masonry', label: __('masonry', 'wp-gutenberg-postlist') },
    { value: 'featured', label: __('featured', 'wp-gutenberg-postlist') },
  ];

  const controls = (
    <InspectorControls>
      <QueryControls
        { ...{ order, orderBy } }
        numberOfItems={ postsToShow }
        categoriesList={ categoriesList }
        selectedCategoryId={ categories }
        onOrderChange={ ( value ) => setAttributes( { order: value } ) }
        onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
        onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
        onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
      />
      <SelectControl
        key="layout-input"
        label={ __('Layout', 'wp-gutenberg-postlist') }
        value={ layout }
        onChange={ (value) => setAttributes({ layout: value }) }
        options={ layoutOptions }
      />
      <RangeControl
        key="columns-input"
        label={ __('Columns', 'wp-gutenberg-postlist') }
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
          tagName="h2"
          keepPlaceholderOnFocus="true"
          autocompleters={ [] }
          style={ { textAlign: 'center' } }
          value={ title }
          onChange={ value => setAttributes({ title: value }) }
          placeholder={ __('Write heading…', 'wp-gutenberg-postlist') }
        />
      ) : null }
      <CustomServerSideRender
        block={ `genero/postlist-${this.postType}` }
        attributes={ { columns, layout, order, orderBy, postsToShow, categories } }
        ref={ this.serverSideRef }
        onUpdate={ this.initMasonry }
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
            placeholder={ __('Link to archive…', 'wp-gutenberg-postlist') }
          />
        </div>
      ) : null }
    </Fragment>
  );
}

export default function (postType) {
  const proto = {
    postType,
    serverSideRef: createRef(),
    masonryElement: null,
    sidebarOpen: false,

    initMasonry() {
      if (!this.serverSideRef.current) {
        return;
      }

      const node = findDOMNode(this.serverSideRef.current);
      const el = jQuery(node).find('.js-masonry');
      if (el.length && !el.data('masonry')) {
        const data = el.data('masonry-options') || {};
        window.setTimeout(() => el.masonry(data), 1000);
        this.masonryElement = el;
      }
    },

    reflowMasonry() {
      if (this.masonryElement) {
        this.masonryElement.masonry('layout');
      }
    },

    subscribe() {
      const editPost = select('core/edit-post');
      const sidebarOpen = editPost && !!editPost.getActiveGeneralSidebarName();
      if (sidebarOpen !== this.sidebarOpen) {
        window.setTimeout(this.reflowMasonry, 200);
        this.sidebarOpen = sidebarOpen;
      }
    },
  }

  subscribe(proto.subscribe.bind(proto));
  proto.initMasonry = proto.initMasonry.bind(proto);
  proto.reflowMasonry = proto.reflowMasonry.bind(proto);

  return withSelect( (select) => {
    const { getEntityRecords } = select('core');

    return {
      categoriesList: getEntityRecords('taxonomy', 'category', {
        per_page: 100,
      }),
    };
  })(edit.bind(proto));
}
