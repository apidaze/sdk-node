const BaseNode = require('./Base');

/**
 * Class representing a speak node
 * @extends BaseNode
 */
class SpeakNode extends BaseNode {
  /**
   * Create a speak node
   * @param {string} content - The content to be set in node
   * @param {Object} [attributes]
   * @param {string} [attributes.lang] - The `lang` attribute value
   * @param {string} [attributes.inputTimeout] - The `input-timeout` attribute value
   * @param {string} [attributes.digitTimeout] - The `digit-timeout` attribute value
   * @override
   */
  constructor(content, { lang, inputTimeout, digitTimeout } = {}) {
    super();

    this.name = 'speak';

    this.root = content;

    const attributes = {
      lang,
      'input-timeout': inputTimeout,
      'digit-timeout': digitTimeout,
    };

    this.setAttributes(attributes);
  }
}

module.exports = SpeakNode;
