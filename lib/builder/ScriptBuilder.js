const BaseNode = require('./nodes/Base');
const nodes = require('./nodes');
const { Work } = nodes;

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

    // bind the `nodes` on ScriptBuilder instance
    for (const nodeName in nodes) {
      if (nodes.hasOwnProperty(nodeName)) {
        const node = nodes[nodeName];
        this[nodeName] = node;
      }
    }

    const work = new Work(attributes);
    const workNode = work.getObject();
    this.root = workNode;
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

module.exports = {
  ScriptBuilder,
  ScriptNodes: nodes,
};
