const test = require('ava');
const Applications = require('../../lib/rest/Applications');
const httpMock = require('../../mocks/http');
const nock = require('nock');

const applicationsFixture = [
  {
    id: 3051,
    account_id: 1086,
    application_id: 'apikeyqx',
    api_key: 'apikeyqx',
    api_secret: 'apisecretb005d87f1apisecreta4df7',
    name: 'APPLICATION',
  },
  {
    id: 3052,
    account_id: 1086,
    application_id: 'apikeymo',
    api_key: 'apikeymo',
    api_secret: 'apisecret01a14548apisecret38f183',
    name: 'APPLICATION 44',
  },
];

test('exports a fuction', t => {
  t.is(typeof Applications, 'function');
});

test('fails without http client', t => {
  t.throws(() => new Applications(), {
    message: "'http' must be provided.",
  });
});

test('.list fetches the list of sub-applications', async t => {
  const scope = nock(/apidaze/)
    .get(/applications/)
    .reply(200, applicationsFixture);

  const client = new Applications(httpMock);
  const { body, statusCode } = await client.list();

  t.deepEqual(body, applicationsFixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.getByApiKey fetches the list of sub-applications with the given API key', async t => {
  const apiKey = 'apikeyqx';
  const appsFixtureByKey = applicationsFixture.filter(
    app => app.api_key === apiKey
  );
  const scope = nock(/apidaze/)
    .get(new RegExp(`applications\?.*api_key=${apiKey}`))
    .reply(200, appsFixtureByKey);

  const client = new Applications(httpMock);
  const { body, statusCode } = await client.getByApiKey(apiKey);

  t.deepEqual(body, appsFixtureByKey);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.getByName fetches the list of sub-applications with the given app name', async t => {
  const appName = 'APPLICATION';
  const appsFixtureByName = applicationsFixture.filter(
    app => app.name === appName
  );
  const scope = nock(/apidaze/)
    .get(new RegExp(`applications\?.*app_name=${appName}`))
    .reply(200, appsFixtureByName);

  const client = new Applications(httpMock);
  const { body, statusCode } = await client.getByName(appName);

  t.deepEqual(body, appsFixtureByName);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.getById fetches the list of sub-applications with the given app name', async t => {
  const appId = 3051;
  const appsFixtureById = applicationsFixture.filter(app => app.id === appId);
  const scope = nock(/apidaze/)
    .get(new RegExp(`applications\?.*app_id=${appId}`))
    .reply(200, appsFixtureById);

  const client = new Applications(httpMock);
  const { body, statusCode } = await client.getById(appId);

  t.deepEqual(body, appsFixtureById);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});
