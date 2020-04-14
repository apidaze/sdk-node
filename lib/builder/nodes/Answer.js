const BaseNode = require('./Base');

/**
 * Class representing an answer node
 * @extends BaseNode
 */
class AnswerNode extends BaseNode {
  /**
   * @override
   */
  constructor(content, attributes = {}) {
    super(content, attributes);

    this.name = 'answer';
  }
}

module.exports = AnswerNode;
