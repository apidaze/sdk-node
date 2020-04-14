const test = require('ava');
const { Base } = require('../../../lib/builder/nodes');

test('has a string content when constructed with string', t => {
  const content = 'optional text content';
  const node = new Base(content);
  t.is(typeof node.root, 'string');
  t.is(node.root, content);
  t.is(node.root.length, content.length);
});

test('.add adds a node', t => {
  const node = new Base();
  t.is(node.root.length, 0);

  const childNode = new Base('optional text content');
  node.add(childNode);
  t.is(node.root.length, 1);

  t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
  t.snapshot(node.toString(), { id: `${t.title} - XML representation` });
});

test('.add makes the content array if it is not', t => {
  const content = 'optional text content';
  const nodeA = new Base(content);
  const nodeB = new Base();
  t.is(typeof nodeA.root, 'string');

  nodeA.add(nodeB);
  t.true(Array.isArray(nodeA.root));
  t.true(nodeA.hasChildren());
});

test('.add ignores non-BaseNode inherited inputs', t => {
  const node = new Base();
  node.add({ child: 'content' });

  t.is(node.root.length, 0);
});

test('.hasChildren checkes whether or not the content is an array', t => {
  const nodeA = new Base();
  t.is(Array.isArray(nodeA.root), nodeA.hasChildren());

  const nodeB = new Base('optional text content');
  t.false(Array.isArray(nodeB.root));
  t.false(nodeB.hasChildren());
});

test('.setAttribute sets an attribute on node', t => {
  const node = new Base();

  node.setAttribute('key', 'value');

  t.deepEqual(node.attributes, { key: 'value' });
  t.is(node.attributes.key, 'value');
  t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
  t.snapshot(node.toString(), { id: `${t.title} - XML representation` });
});

test('.setAttributes sets an object of attributes', t => {
  const node = new Base();
  const attributes = {
    key1: 'value1',
    key2: 'value2',
  };

  node.setAttributes(attributes);

  t.deepEqual(node.attributes, attributes);
  t.is(node.attributes.key1, 'value1');
  t.is(node.attributes.key2, 'value2');
  t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
  t.snapshot(node.toString(), { id: `${t.title} - XML representation` });
});

test('.setAttributes ignores properties in the prototype chain of the given object', t => {
  const node = new Base();
  const attributes = Object.create({ key1: 'value1' });
  attributes.key2 = 'value2';

  node.setAttributes(attributes);

  t.is(node.attributes.key1, undefined);
  t.is(node.attributes.key2, 'value2');
});

test('.setAttributes ignores `undefined` or `null` values', t => {
  const node = new Base();
  const attributes = {
    key1: undefined,
    key2: null,
    key3: 'value',
  };

  node.setAttributes(attributes);

  t.is(node.attributes.hasOwnProperty('key1'), false);
  t.is(node.attributes.hasOwnProperty('key2'), false);
  t.is(node.attributes.hasOwnProperty('key3'), true);
});

test('.getObject returns an object representation of the node', t => {
  const node = new Base();
  const nodeName = node.name;
  const attributes = {
    key1: 'value1',
  };
  const objectPresentation = {
    [nodeName]: [
      {
        _attr: attributes,
      },
    ],
  };

  node.setAttributes(attributes);

  t.deepEqual(node.getObject(), objectPresentation);
  t.snapshot(node.getObject(), { id: `${t.title} - Object representation` });
});

test('.toString returns string XML content', t => {
  const node = new Base();
  const output = node.toString();

  t.snapshot(output, { id: `${t.title} - XML representation` });
});

test.todo(
  'instanceof tells whether or not if the instance is inherited from Base'
);
