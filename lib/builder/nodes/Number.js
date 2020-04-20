const BaseNode = require('./Base');

/**
 * Class representing a number node
 * @extends BaseNode
 */
class NumberNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'number';
  }
}

module.exports = NumberNode;
