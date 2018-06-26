import edit from './edit';

import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

const postTypes = window._gutenberg_postlist.posttypes;

Object.keys(postTypes).forEach((postType) => {
  const options = postTypes[postType];

  registerBlockType(`genero/postlist-${postType}`, {
    title: sprintf(__('Listing: %s', 'wp-gutenberg-postlist'), options.label),
    icon: options.icon || 'admin-page',
    category: 'embed',

    supports: Object.assign({
      align: ['center', 'wide', 'full'],
    }, options.supports || {}),

    keywords: [
      __('list', 'wp-gutenberg-postlist'),
    ].concat(options.keywords || []),

    edit: edit(postType),

    save: () => {
      return null;
    },
  });
});

