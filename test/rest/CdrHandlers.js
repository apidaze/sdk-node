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

  const methods = [client.list, client.create, client.update];

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
      url: 'https://example.com/handle_call',
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

test('.update updates a CDR HTTP handler', async t => {
  const id = 2;
  const fixture = {
    id: 2,
    name: 'A sample CDR HTTP handler',
    url: 'https://example.com/handle_call',
    call_leg: 'inbound',
  };

  const scope = nock(/apidaze/)
    .put(new RegExp(`cdrhttphandlers/${id}`))
    .reply(202, fixture);

  const client = new CdrHandlers(httpMock);
  const { body: cdrHandler, statusCode } = await client.update(id, fixture);

  t.deepEqual(cdrHandler, fixture);
  t.is(statusCode, 202);
  t.true(scope.isDone());
});

test('.create creates a CDR HTTP handler', async t => {
  const fixture = {
    id: 1,
    name: 'A sample CDR HTTP handler',
    url: 'https://example.com/handle_call',
    call_leg: 'inbound',
  };

  const scope = nock(/apidaze/)
    .post(/cdrhttphandlers/)
    .reply(201, fixture);

  const client = new CdrHandlers(httpMock);
  const { body: cdrHandler, statusCode } = await client.create(fixture);

  t.deepEqual(cdrHandler, fixture);
  t.is(statusCode, 201);
  t.true(scope.isDone());
});
