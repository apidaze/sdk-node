const test = require('ava');
const { Dial } = require('../../../lib/builder/nodes');

test('expects 8 attributers at constructor', t => {
  const attributes = {
    maxCallDuration: 5000,
    answerUrl: 'http://f25093a8.eu.ngrok.io/answer.xml',
    callerHangupUrl: 'http://f25093a8.eu.ngrok.io/hangup.xml',
    timeout: 60,
    strategy: 'sequence',
    action: 'http://f25093a8.eu.ngrok.io/script.xml',
  };
  const node = new Dial({
    ...attributes,
    destination: '1234567890',
    targetType: 'number',
  });

  t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
  t.snapshot(node.toString(), { id: `${t.title} - XML representation` });
});

test('.getCalleeNode returns a node such as Number|SipAccount|SipUri', t => {
  const destination = '1234567890';
  const targetType = 'sipaccount';
  const node = new Dial({ destination, targetType });
  const calleeNode = node.getCalleeNode({
    destination,
    targetType: 'sipaccount',
  });

  t.snapshot(calleeNode.getObject(), {
    id: `${t.title} - Object representation`,
  });
  t.snapshot(calleeNode.toString(), { id: `${t.title} - XML representation` });
});

['Number', 'SipAccount', 'SipUri'].forEach(nodeName => {
  test(`.addCalleeNode can add a ${nodeName} node`, t => {
    const destination = '1234567890';
    const targetType = nodeName.toLowerCase();
    const node = new Dial({ destination, targetType });
    node.addCalleeNode({ destination, targetType });

    t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
    t.snapshot(node.toString(), { id: `${t.title} - XML representation` });
  });
});

test('.addCalleeNode adds a Number node by default', t => {
  const destination = '1234567890';
  const targetType = 'sipaccount';
  const node = new Dial({ destination, targetType });
  node.addCalleeNode({ destination });

  t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
  t.snapshot(node.toString(), { id: `${t.title} - XML representation` });
});
