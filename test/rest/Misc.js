const test = require('ava');
const Misc = require('../../lib/rest/Misc');
const httpMock = require('../../mocks/http');
const nock = require('nock');

test('exports a fuction', t => {
  t.is(typeof Misc, 'function');
});

test('fails without http client', t => {
  t.throws(() => new Misc(), {
    message: "'http' must be provided.",
  });
});

test('has miscellaneous methods to support in general', t => {
  const client = new Misc(httpMock);

  const methods = [client.validate];

  methods.forEach(method => {
    t.truthy(method);
    t.is(typeof method, 'function');
  });
});

test('.validate validates the provided api key and api secret', async t => {
  const fixture = { global: 'Authentication succeeded' };
  const scope = nock(/apidaze/)
    .get(/validates/)
    .reply(200, fixture);

  const client = new Misc(httpMock);
  const { body, statusCode } = await client.validate();

  t.deepEqual(body, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});
