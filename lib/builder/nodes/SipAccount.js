const BaseNode = require('./Base');

/**
 * Class representing a sip account node
 * @extends BaseNode
 */
class SipAccountNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'sipaccount';
  }
}

module.exports = SipAccountNode;
