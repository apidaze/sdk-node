const BaseNode = require('./Base');

/**
 * Class representing a sip uri node
 * @extends BaseNode
 */
class SipUriNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'sipuri';
  }
}

module.exports = SipUriNode;
