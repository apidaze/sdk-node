const BaseNode = require('./Base');

/**
 * Class representing a work node
 * @extends BaseNode
 */
class WorkNode extends BaseNode {
  /**
   * @override
   */
  constructor(attributes = {}) {
    super(null, attributes);

    this.name = 'work';
  }
}

module.exports = WorkNode;
