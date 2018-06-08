<?php

namespace GeneroWP\BlockPostlist\postlist;

use GeneroWP\Common\Singleton;
use GeneroWP\Common\Templating;

class PostlistBlock
{
    use Singleton;
    use Templating;

    public function __construct()
    {
        add_action('enqueue_block_editor_assets', [$this, 'editorAssets'], 11);
        add_action('init', [$this, 'registerBlocks']);
    }

    public function registerBlocks()
    {
        foreach ($this->getPostTypes() as $postType => $options) {
            register_block_type("genero/postlist-$postType", [
                'attributes' => [
                    'className' => [
                        'type' => 'string',
                    ],
                    'postType' => [
                        'type' => 'string',
                        'default' => $postType,
                    ],
                    'postsToShow' => [
                        'type' => 'number',
                        'default' => 3,
                    ],
                    'columns' => [
                        'type' => 'number',
                        'default' => 3,
                    ],
                    'align' => [
                        'type' => 'string',
                        'default' => 'center',
                    ],
                    'order' => [
                        'type' => 'string',
                        'default' => 'desc',
                    ],
                    'orderBy' => [
                        'type'    => 'string',
                        'default' => 'date',
                    ],
                ],
                'render_callback' => [$this, 'render'],
            ]);
        }
    }

    public function editorAssets()
    {
        $data = [
            'posttypes' => $this->getPostTypes(),
        ];
        $script = 'window._gutenberg_postlist = ' . json_encode($data) . ';';
        wp_add_inline_script('wp-gutenberg-postlist/block/js', $script, 'before');
    }

    protected function getPostTypes()
    {
        return apply_filters('wp-gutenberg-postlist/posttypes', [
            'post' => [
                'label' => __('Post'),
                'icon' => 'admin-post',
                'keywords' => [
                    __('post'),
                    __('archive'),
                ],
            ],
        ]);
    }

    public function render($attributes)
    {
        $attributes['posts'] = get_posts([
            'posts_per_page' => $attributes['postsToShow'],
            'orderby' => $attributes['orderBy'],
            'order' => $attributes['order'],
            'post_type' => $attributes['postType'],
            'post_status' => 'publish',
        ]);

        $attributes['classes'][] = "wp-block-genero-postlist--{$attributes['postType']}";
        $attributes['classes'][] = !empty($attributes['align']) ? "align{$attributes['align']}" : '';
        $attributes['classes'][] = !empty($attributes['columns']) ? "has-{$attributes['columns']}-columns" : '';

        return $this->template('gutenberg', 'views/postlist.php', $attributes);
    }
}

ExampleBlock::get_instance();
