const test = require('ava');
const CdrHandlers = require('../../lib/rest/CdrHandlers');
const httpMock = require('../../mocks/http');
const nock = require('nock');

test('exports a fuction', t => {
  t.is(typeof CdrHandlers, 'function');
});

test('fails without http client', t => {
  t.throws(() => new CdrHandlers(), {
    message: "'http' must be provided.",
  });
});

test('has convenient methods to manage CDR HTTP handlers', t => {
  const client = new CdrHandlers(httpMock);

  const methods = [client.list];

  methods.forEach(method => {
    t.truthy(method);
    t.is(typeof method, 'function');
  });
});

test('.list fetches CDR HTTP handlers', async t => {
  const fixture = [
    {
      id: 1,
      name: 'A sample CDR HTTP handler',
      url: 'https://apidaze.io/handle_call',
      call_leg: 'inbound',
    },
  ];

  const scope = nock(/apidaze/)
    .get(/cdrhttphandlers/)
    .reply(200, fixture);

  const client = new CdrHandlers(httpMock);
  const { body: cdrHandlers, statusCode } = await client.list();

  t.deepEqual(cdrHandlers, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});
