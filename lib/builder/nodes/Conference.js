const BaseNode = require('./Base');

/**
 * Class representing a conference node
 * @extends BaseNode
 */
class ConferenceNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'conference';
  }
}

module.exports = ConferenceNode;
