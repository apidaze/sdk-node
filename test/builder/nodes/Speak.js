const test = require('ava');
const { Speak } = require('../../../lib/builder/nodes');

test('expects content and 3 attributes at constructor', t => {
  const attributes = {
    lang: 'de-DE',
    inputTimeout: 1000,
    digitTimeout: 2000,
  };
  const node = new Speak('Hello world', attributes);
  t.deepEqual(node.attributes, {
    lang: attributes.lang,
    'input-timeout': attributes.inputTimeout,
    'digit-timeout': attributes.digitTimeout,
  });
});
