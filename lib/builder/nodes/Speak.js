const BaseNode = require('./Base');

/**
 * Class representing a speak node
 * @extends BaseNode
 */
class SpeakNode extends BaseNode {
  /**
   * Create a speak node
   * @param {string} content - Text to be spoken
   * @param {Object} [attributes]
   * @param {string} [attributes.lang] - The language this text will be spoken
   * @param {string} [attributes.inputTimeout] - The input timeout in miliseconds
   * @param {string} [attributes.digitTimeout] - The digit timeout in miliseconds
   * @override
   */
  constructor(content, { inputTimeout, digitTimeout, ...restOfAttrs } = {}) {
    super();

    this.name = 'speak';

    this.root = [content];

    const attributes = {
      'input-timeout': inputTimeout,
      'digit-timeout': digitTimeout,
      ...restOfAttrs,
    };

    this.setAttributes(attributes);
  }
}

module.exports = SpeakNode;
