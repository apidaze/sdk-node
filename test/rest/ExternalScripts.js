const test = require('ava');
const ExternalScripts = require('../../lib/rest/ExternalScripts');
const httpMock = require('../../mocks/http');
const nock = require('nock');

test('exports a fuction', t => {
  t.is(typeof ExternalScripts, 'function');
});

test('fails without http client', t => {
  t.throws(() => new ExternalScripts(), {
    message: "'http' must be provided.",
  });
});

test('has convenient methods to manage external scripts', t => {
  const client = new ExternalScripts(httpMock);

  const methods = [client.list, client.get, client.update];

  methods.forEach(method => {
    t.truthy(method);
    t.is(typeof method, 'function');
  });
});

test('.get fetches an external script with the given ID', async t => {
  const id = 1;
  const fixture = [
    {
      name: 'Example',
      url: 'https://example.com/script',
    },
  ];

  const scope = nock(/apidaze/)
    .get(new RegExp(`externalscripts/${id}`))
    .reply(200, fixture);

  const client = new ExternalScripts(httpMock);
  const { body: externalScript, statusCode } = await client.get(id);

  t.deepEqual(externalScript, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.list fetches external scripts', async t => {
  const fixture = [
    {
      id: 1,
      name: 'Example',
      url: 'https://example.com/script',
    },
  ];

  const scope = nock(/apidaze/)
    .get(/externalscripts/)
    .reply(200, fixture);

  const client = new ExternalScripts(httpMock);
  const { body: externalScripts, statusCode } = await client.list();

  t.deepEqual(externalScripts, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.update updates an external script', async t => {
  const id = 2;
  const fixture = {
    name: 'Example',
    url: 'https://example.com/script',
  };

  const scope = nock(/apidaze/)
    .put(new RegExp(`externalscripts/${id}`))
    .reply(202, fixture);

  const client = new ExternalScripts(httpMock);
  const { body: externalScript, statusCode } = await client.update(id, fixture);

  t.deepEqual(externalScript, fixture);
  t.is(statusCode, 202);
  t.true(scope.isDone());
});
