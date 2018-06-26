!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=2)}([function(e,t){e.exports=wp.components},function(e,t){e.exports=wp.i18n},function(e,t,n){n(3),n(9),e.exports=n(10)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),o=n(0),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o["ServerSideRender"]),i(t,[{key:"componentDidUpdate",value:function(e,t){Object(r.isEqual)(e,this.props)||this.fetch(this.props),this.state.response!==t.response&&this.props.onUpdate&&this.props.onUpdate()}}]),t}(),a=n(1),c=n(5),u=n(6),l=n(7),p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};var f=function(e){var t={postType:e,serverSideRef:Object(c.createRef)(),masonryElement:null,sidebarOpen:!1,initMasonry:function(){if(this.serverSideRef.current){var e=Object(c.findDOMNode)(this.serverSideRef.current),t=jQuery(e).find(".js-masonry");if(t.length&&!t.data("masonry")){var n=t.data("masonry-options")||{};window.setTimeout(function(){return t.masonry(n)},1e3),this.masonryElement=t}}},reflowMasonry:function(){this.masonryElement&&this.masonryElement.masonry("layout")},subscribe:function(){var e=!!Object(l.select)("core/edit-post").getActiveGeneralSidebarName();e!==this.sidebarOpen&&(window.setTimeout(this.reflowMasonry,200),this.sidebarOpen=e)}};return Object(l.subscribe)(t.subscribe.bind(t)),t.initMasonry=t.initMasonry.bind(t),t.reflowMasonry=t.reflowMasonry.bind(t),function(e){var t=e.attributes,n=e.setAttributes,r=e.isSelected,i=t.title,l=t.archiveLinkText,f=t.columns,b=t.layout,d=t.order,y=t.orderBy,h=t.postsToShow,g=[{value:"grid",label:Object(a.__)("grid","wp-gutenberg-postlist")},{value:"masonry",label:Object(a.__)("masonry","wp-gutenberg-postlist")},{value:"featured",label:Object(a.__)("featured","wp-gutenberg-postlist")}],m=React.createElement(u.InspectorControls,null,React.createElement(o.QueryControls,p({order:d,orderBy:y},{numberOfItems:h,onOrderChange:function(e){return n({order:e})},onOrderByChange:function(e){return n({orderBy:e})},onNumberOfItemsChange:function(e){return n({postsToShow:e})}})),React.createElement(o.SelectControl,{key:"layout-input",label:Object(a.__)("Layout","wp-gutenberg-postlist"),value:b,onChange:function(e){return n({layout:e})},options:g}),React.createElement(o.RangeControl,{key:"columns-input",label:Object(a.__)("Columns","wp-gutenberg-postlist"),value:f,onChange:function(e){return n({columns:e})},min:1,max:4}));return React.createElement(c.Fragment,null,m,i||r?React.createElement(u.RichText,{key:"title-input",format:"string",tagName:"h2",keepPlaceholderOnFocus:"true",autocompleters:[],style:{textAlign:"center"},value:i,onChange:function(e){return n({title:e})},placeholder:Object(a.__)("Write heading…","wp-gutenberg-postlist")}):null,React.createElement(s,{block:"genero/postlist-"+this.postType,attributes:{columns:f,layout:b,order:d,orderBy:y,postsToShow:h},ref:this.serverSideRef,onUpdate:this.initMasonry}),l||r?React.createElement("div",{className:"wp-block-genero-postlist__archivelink_wrapper"},React.createElement(u.RichText,{key:"archivelink-input",format:"string",tagName:"div",className:"wp-block-genero-postlist__archivelink",keepPlaceholderOnFocus:!0,value:l,onChange:function(e){return n({archiveLinkText:e})},placeholder:Object(a.__)("Link to archive…","wp-gutenberg-postlist")})):null)}.bind(t)},b=n(8),d=window._gutenberg_postlist.posttypes;Object.keys(d).forEach(function(e){var t=d[e];Object(b.registerBlockType)("genero/postlist-"+e,{title:Object(a.sprintf)(Object(a.__)("Listing: %s","wp-gutenberg-postlist"),t.label),icon:t.icon||"admin-page",category:"embed",supports:Object.assign({align:["center","wide","full"]},t.supports||{}),keywords:[Object(a.__)("list","wp-gutenberg-postlist")].concat(t.keywords||[]),edit:f(e),save:function(){return null}})})},function(e,t){e.exports=lodash},function(e,t){e.exports=wp.element},function(e,t){e.exports=wp.editor},function(e,t){e.exports=wp.data},function(e,t){e.exports=wp.blocks},function(e,t){},function(e,t){}]);