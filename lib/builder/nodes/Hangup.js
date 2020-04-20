const BaseNode = require('./Base');

/**
 * Class representing a hangup node
 * @extends BaseNode
 */
class HangupNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'hangup';
  }
}

module.exports = HangupNode;
