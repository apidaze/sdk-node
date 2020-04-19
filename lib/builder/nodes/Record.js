const BaseNode = require('./Base');

/**
 * Class representing a record node
 * @extends BaseNode
 */
class RecordNode extends BaseNode {
  /**
   * @param {Object} attributes
   * @param {Boolean} attributes.onAnswered - Start recording on answer
   * @param {Boolean} attributes.aLeg - Record the A-leg of the call. caller to callee
   * @param {Boolean} attributes.bLeg - Record the B-leg of the call. callee to caller
   * @param {string} attributes.name - The recording file name without suffix
   *
   * @override
   */
  constructor({ onAnswered, aLeg, bLeg, name } = {}) {
    super();

    this.name = 'record';

    const attributes = {
      'on-answered': onAnswered,
      aleg: aLeg,
      bleg: bLeg,
      name: name,
    };

    this.setAttributes(attributes);
  }
}

module.exports = RecordNode;
