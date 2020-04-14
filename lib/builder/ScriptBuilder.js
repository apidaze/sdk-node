const BaseNode = require('./nodes/Base');

/**
 * Class representing a script builder
 * @extends BaseNode
 */
class ScriptBuilder extends BaseNode {
  /**
   * Create a new script builder
   * @param {Object} [attributes] - An object of attributes
   * @override
   */
  constructor(attributes = {}) {
    super();

    this.name = 'document';

    this.attributes = attributes;

    this.root = {
      work: [],
    };
  }

  /**
   * @override
   */
  add(node) {
    const isInstance = node instanceof BaseNode;

    if (isInstance) {
      const nodeObject = node.getObject();
      this.root.work.push(nodeObject);
    }

    return this;
  }
}

module.exports = ScriptBuilder;
