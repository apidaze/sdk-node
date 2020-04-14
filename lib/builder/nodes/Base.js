const xml = require('xml');

/**
 * Class representing a base node
 */
class BaseNode {
  /**
   * Create a new script builder client
   * @param {string|Array<BaseNode>} [content] - The node's content
   * @param {Object} [attributes] - An object of attributes
   */
  constructor(content, attributes = {}) {
    this.name = 'base';

    this.root = content || [];

    this.attributes = attributes;

    this.options = {
      indent: '  ',
    };
  }

  /**
   * Add a node inherited from {@link BaseNode}
   * @param {BaseNode} node - The node to be added to the instance
   * @return {Promise<Response>}
   */
  add(node) {
    const isInstance = node instanceof BaseNode;

    if (isInstance) {
      if (!Array.isArray(this.root)) {
        this.root = [];
      }

      const nodeObject = node.getObject();
      this.root.push(nodeObject);
    }

    return this;
  }

  /**
   * Check whether or not the content is an array
   * @return {Boolean}
   */
  hasChildren() {
    return Array.isArray(this.root);
  }

  /**
   * Set an attribute
   * @param {string} key - The attribute name
   * @param {string} value - The attribute value
   * @return {BaseNode}
   */
  setAttribute(key, value) {
    if (value !== undefined && value !== null) {
      this.attributes[key] = value;
    }

    return this;
  }

  /**
   * Set a set of attributes
   *
   * @param {Object} attributes - An object of attributes
   * @return {BaseNode}
   */
  setAttributes(attributes) {
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        const value = attributes[key];
        this.setAttribute(key, value);
      }
    }

    return this;
  }

  /**
   * Get object representation of the node
   *
   * @return {Object} - The object representation of the node
   */
  getObject() {
    if (this.hasChildren()) {
      return {
        [this.name]: [
          {
            _attr: this.attributes,
          },
          ...this.root,
        ],
      };
    }

    return {
      [this.name]: [
        {
          _attr: this.attributes,
        },
        this.root,
      ],
    };
  }

  /**
   * Get the stringified XML content
   * @example
   * const scriptBuilder = new Apidaze.scriptBuilder();
   * const answer = new AnswerNode();
   * const output = scriptBuilder.add(answer).toString();
   *
   * // output returns;
   * // <document>
   * //  <work>
   * //   <answer></answer>
   * //  </work>
   * // </document>
   * @return {string} - Stringified XML content
   */
  toString() {
    return xml(this.getObject(), this.options);
  }

  /**
   * Check if the given instance is a child
   * @param {BaseNode} instance - The given instance to be checked
   * @return {Boolean} whether or not the instance is inherited from BaseNode
   */
  static [Symbol.hasInstance](instance) {
    const implementationDetails = [
      instance,
      instance.name,
      instance.attributes,
      instance.setAttribute,
      instance.setAttributes,
      instance.getObject,
    ];

    return implementationDetails.every(Boolean);
  }
}

module.exports = BaseNode;
