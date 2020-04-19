const BaseNode = require('./Base');

/**
 * Class representing a playback node
 * @extends BaseNode
 */
class PlaybackNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'playback';
  }
}

module.exports = PlaybackNode;
