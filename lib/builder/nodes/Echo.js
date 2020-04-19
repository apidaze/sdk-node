const BaseNode = require('./Base');

/**
 * Class representing an echo node
 * @extends BaseNode
 */
class EchoNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'echo';
  }
}

module.exports = EchoNode;
