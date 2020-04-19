const test = require('ava');
const { Record } = require('../../../lib/builder/nodes');

test('expects 4 attributes at constructor', t => {
  const attributes = {
    onAnswered: true,
    aLeg: true,
    bLeg: false,
    name: 'a_sample_record',
  };

  const node = new Record(attributes);
  t.deepEqual(node.attributes, {
    'on-answered': attributes.onAnswered,
    aleg: attributes.aLeg,
    bleg: attributes.bLeg,
    name: attributes.name,
  });

  t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
  t.snapshot(node.toString(), { id: `${t.title} - XML representation` });
});
