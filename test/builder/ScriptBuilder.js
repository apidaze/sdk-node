const test = require('ava');
const { ScriptBuilder } = require('../../lib/builder/ScriptBuilder');
const nodes = require('../../lib/builder/nodes');
const { Answer, Base } = nodes;

test('is inherited from BaseNode', t => {
  const scriptBuilder = new ScriptBuilder();
  t.true(scriptBuilder instanceof Base);
});

test(`has a root tag called 'document'`, t => {
  const scriptBuilder = new ScriptBuilder();
  const scriptObject = scriptBuilder.getObject();
  const scriptOutput = scriptBuilder.toString();

  t.true(scriptObject.hasOwnProperty('document'));
  t.snapshot(scriptObject, { id: `${t.title} - Object representation` });
  t.snapshot(scriptOutput, { id: `${t.title} - XML representation` });
});

test('has nodes as a property', t => {
  t.plan(Object.keys(nodes).length);

  const scriptBuilder = new ScriptBuilder();

  for (const nodeName in nodes) {
    if (nodes.hasOwnProperty(nodeName)) {
      const node = nodes[nodeName];
      t.is(scriptBuilder[nodeName], node);
    }
  }
});

test('.add adds the given node in a default child', t => {
  const scriptBuilder = new ScriptBuilder();
  const node = new Answer();

  t.false(Array.isArray(scriptBuilder.root));
  t.is(scriptBuilder.root.work.length, 1);

  scriptBuilder.add(node);
  t.is(scriptBuilder.root.work.length, 2);
});

test('.add ignores non-BaseNode inherited inputs', t => {
  const scriptBuilder = new ScriptBuilder();
  scriptBuilder.add({ child: 'content' });

  t.is(scriptBuilder.root.work.length, 1);
});
