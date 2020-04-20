const BaseNode = require('./Base');

/**
 * Class representing a bind node
 * @extends BaseNode
 */
class BindNode extends BaseNode {
  /**
   * @param {string} content - The dialed digit
   * @param {Object} attributes
   * @param {string} attributes.action - The URL to fetch if the digit matches
   *
   * @override
   */
  constructor(content, attributes) {
    super(content, attributes);

    this.name = 'bind';
  }
}

module.exports = BindNode;
