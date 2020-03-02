const test = require('ava');
const index = require('../index');

test('has an export', t => {
  t.is(typeof index, 'object');
});

test('has a client called Apidaze', t => {
  t.truthy(index.Apidaze);
});
