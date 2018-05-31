<div class="wp-block-genero-postlist <?php echo implode(' ', $classes); ?>">
  <?php foreach ($posts as $post) : setup_postdata($post) ?>
    <div class="wp-block-genero-postlist__item">
      <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
      <?php the_excerpt(); ?>
    </div>
  <?php endforeach; ?>
</div>
