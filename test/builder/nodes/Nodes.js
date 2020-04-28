const test = require('ava');
const { Base, ...nodes } = require('../../../lib/builder/nodes');

test(`has 16 nodes inherited from BaseNode`, t => {
  t.plan(16);

  for (const nodeName in nodes) {
    if (nodes.hasOwnProperty(nodeName)) {
      const Node = nodes[nodeName];
      const instance = new Node();
      t.true(instance instanceof Base);
    }
  }
});

test('has lowercased names', t => {
  t.plan(16);

  for (const nodeName in nodes) {
    if (nodes.hasOwnProperty(nodeName)) {
      const Node = nodes[nodeName];
      const instance = new Node();
      t.is(nodeName.toLowerCase(), instance.name);
    }
  }
});
