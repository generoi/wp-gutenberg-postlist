<?php
/*
Plugin Name:        Gutenberg Post List
Plugin URI:         http://genero.fi
Description:        A Post list block for WordPress Gutenberg
Version:            1.0.0
Author:             Genero
Author URI:         http://genero.fi/
License:            MIT License
License URI:        http://opensource.org/licenses/MIT
*/
namespace GeneroWP\BlockPostlist;

use Puc_v4_Factory;
use GeneroWP\Common\Singleton;
use GeneroWP\Common\Assets;

if (!defined('ABSPATH')) {
    exit;
}

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
}

class Plugin
{
    use Singleton;
    use Assets;

    public $version = '1.0.0';
    public $plugin_name = 'wp-gutenberg-postlist';
    public $plugin_path;
    public $plugin_url;
    public $github_url = 'https://github.com/generoi/wp-gutenberg-postlist';

    public function __construct()
    {
        $this->plugin_path = plugin_dir_path(__FILE__);
        $this->plugin_url = plugin_dir_url(__FILE__);

        Puc_v4_Factory::buildUpdateChecker($this->github_url, __FILE__, $this->plugin_name);

        add_action('plugins_loaded', [$this, 'init']);
    }

    public function init()
    {
        add_action('enqueue_block_assets', [$this, 'block_assets']);
        add_action('enqueue_block_editor_assets', [$this, 'block_editor_assets']);

        foreach (glob(__DIR__ . '/src/*/index.php') as $component) {
            require $component;
        }
    }

    public function block_assets()
    {
        $this->enqueueStyle('wp-gutenberg-postlist/block/css', 'dist/blocks.style.build.css', ['wp-blocks']);
    }

    public function block_editor_assets()
    {
        wp_enqueue_script('masonry');

        $this->enqueueScript('wp-gutenberg-postlist/block/js', 'dist/blocks.build.js', ['wp-blocks', 'wp-i18n', 'wp-element']);
        $this->enqueueStyle('wp-gutenberg-postlist/block/editor/css', 'dist/blocks.editor.build.css', ['wp-edit-blocks']);
    }
}

Plugin::getInstance();
