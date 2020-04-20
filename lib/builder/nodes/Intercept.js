const BaseNode = require('./Base');

/**
 * Class representing an intercept node
 * @extends BaseNode
 */
class InterceptNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'intercept';
  }
}

module.exports = InterceptNode;
