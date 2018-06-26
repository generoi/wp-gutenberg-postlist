<div class="wp-block-genero-postlist <?php echo implode(' ', $classes); ?>">
  <?php if (!empty($title)) : ?>
    <h3 class="wp-block-genero-postlist__title"><?php echo esc_html($title); ?></h3>
  <?php endif; ?>
  <div class="wp-block-genero-postlist__list">
    <?php foreach ($posts as $post) : setup_postdata($post) ?>
      <div class="wp-block-genero-postlist__item">
        <div class="wp-block-genero-postlist__item-thumbnail">
          <?php the_post_thumbnail(); ?>
        </div>
        <h4 class="wp-block-genero-postlist__item-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
        <div class="wp-block-genero-postlist__item-excerpt">
        <?php the_excerpt(); ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
  <?php if (!empty($archive_link['url'])) : ?>
    <div class="wp-block-genero-postlist__archivelink_wrapper">
      <a href="<?php echo esc_attr($archive_link['url']); ?>" class="wp-block-genero-postlist__archivelink"><?php echo esc_html($archive_link['text']); ?></a>
    </div>
  <?php endif; ?>
</div>
