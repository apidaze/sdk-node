const BaseNode = require('./Base');

/**
 * Class representing a wait node
 * @extends BaseNode
 */
class WaitNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'wait';
  }
}

module.exports = WaitNode;
