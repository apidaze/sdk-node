const BaseNode = require('./Base');

/**
 * Class representing a ringback node
 * @extends BaseNode
 */
class RingbackNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'ringback';
  }
}

module.exports = RingbackNode;
