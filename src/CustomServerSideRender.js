import { isEqual } from 'lodash';
import ServerSideRender from '@wordpress/server-side-render';

// https://github.com/WordPress/gutenberg/issues/7346
export class CustomServerSideRender extends ServerSideRender {
  componentDidUpdate(prevProps) {
    // core
    if (!isEqual(prevProps, this.props)) {
      this.fetch(this.props);

      if (this.props.onUpdate) {
        this.props.onUpdate();
      }
    }
  }
}

export default CustomServerSideRender;
