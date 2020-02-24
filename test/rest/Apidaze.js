const test = require('ava');
const Apidaze = require('../../lib/rest/Apidaze');

const API_KEY = 'API_KEY';
const API_SECRET = 'API_SECRET';

test('exports a function for instantiation', t => {
  const client = new Apidaze(API_KEY, API_SECRET);

  t.is(typeof Apidaze, 'function');
  t.true(client instanceof Apidaze);
});

test('fails when missing required arguments', t => {
  t.throws(() => new Apidaze(API_KEY), {
    message: "'apiKey' and 'apiSecret' must be provided.",
  });
});

test('has properties such as apiKey, apiSecret and apiUrl', t => {
  const client = new Apidaze(API_KEY, API_SECRET);

  t.is(client.apiKey, API_KEY);
  t.is(client.apiSecret, API_SECRET);
  t.truthy(client.apiUrl);
});