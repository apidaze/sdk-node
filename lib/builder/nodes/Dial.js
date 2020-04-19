const BaseNode = require('./Base');
const NumberNode = require('./Number');
const SipAccountNode = require('./SipAccount');
const SipUriNode = require('./SipUri');

/**
 * Class representing a dial node
 * @extends BaseNode
 */
class DialNode extends BaseNode {
  /**
   *
   * @override
   */
  constructor({
    destination,
    targetType,
    timeout,
    maxCallDuration,
    strategy,
    action,
    answerUrl,
    callerHangupUrl,
  } = {}) {
    super();

    this.name = 'dial';

    const attributes = {
      'max-call-duration': maxCallDuration,
      'answer-url': answerUrl,
      'caller-hangup-url': callerHangupUrl,
      timeout,
      strategy,
      action,
    };

    this.setAttributes(attributes);

    const calleeNode = this.getCalleeNode({ destination, targetType });
    this.add(calleeNode);
  }

  /**
   * Get a callee node
   *
   * @param {Object} attributes
   * @param {string} attributes.destination - The destination
   * @param {string} attributes.targetType - The target type such as number, sipaccount, sipuri
   *
   * @return {NumberNode|SipAccountNode|SipUriNode}
   */
  getCalleeNode({ destination, targetType }) {
    const targetMap = {
      sipaccount: SipAccountNode,
      number: NumberNode,
      sipuri: SipUriNode,
    };

    const AssociatedNode = targetMap[targetType] || NumberNode;

    // instantiate an associated node with the given destination
    return new AssociatedNode(destination);
  }

  /**
   * Add a callee node such as Number, Sipaccount or Sipuri
   *
   * @param {Object} attributes
   * @param {string} attributes.destination - The destination
   * @param {string} attributes.targetType - The target type such as number, sipaccount, sipuri
   *
   * @return {Dial}
   */
  addCalleeNode({ destination, targetType }) {
    const calleeNode = this.getCalleeNode({ destination, targetType });
    this.add(calleeNode);

    return this;
  }
}

module.exports = DialNode;
