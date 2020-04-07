const test = require('ava');
const nock = require('nock');
const fs = require('fs');
const path = require('path');

const MediaFiles = require('../../lib/rest/MediaFiles');
const httpMock = require('../../mocks/http');
const silentWavPath = path.resolve(`${__dirname}/../fixtures/silent.wav`);
const silentWavFixture = fs.readFileSync(silentWavPath);

test('exports a fuction', t => {
  t.is(typeof MediaFiles, 'function');
});

test('fails without http client', t => {
  t.throws(() => new MediaFiles(), {
    message: "'baseHttpClient' must be provided.",
  });
});

test('has convenient methods to manage media files', t => {
  const client = new MediaFiles(httpMock);

  const methods = [client.list, client.get, client.summarize];

  methods.forEach(method => {
    t.truthy(method);
    t.is(typeof method, 'function');
  });
});

test('.list fetches media files', async t => {
  const fixture = ['silent.wav', 'anything.wav'];
  const scope = nock(/apidaze/)
    .get(/mediafiles/)
    .reply(200, fixture);

  const client = new MediaFiles(httpMock);
  const { body, statusCode } = await client.list();

  t.deepEqual(body, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.list fetches media files based on the given options', async t => {
  const fixture = ['silent.wav', 'anything.wav'];
  const scope = nock(/apidaze/)
    .get(/mediafiles/)
    .query({
      last_token: 'a_token',
      max_items: 5,
      details: true,
      api_secret: 'API_SECRET',
    })
    .reply(200, fixture);

  const client = new MediaFiles(httpMock);
  const params = {
    lastToken: 'a_token',
    maxItems: 5,
    details: true,
  };
  const { body, statusCode } = await client.list(params);

  t.deepEqual(body, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.list throws an error when the first argument is not an object', async t => {
  const client = new MediaFiles(httpMock);
  await t.throwsAsync(
    async () => {
      await client.list(null);
    },
    { instanceOf: Error, message: `'searchParams' must be an object!` }
  );
});

test('.get fetches a media file', async t => {
  const fileName = 'silent.wav';
  const scope = nock(/apidaze/)
    .get(/mediafiles\/silent.wav/)
    .reply(200, silentWavFixture);

  const client = new MediaFiles(httpMock);
  const { body, statusCode } = await client.get(fileName);

  t.deepEqual(body, silentWavFixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.summarize fetches the summary of a media file', async t => {
  const fileName = 'silent.wav';
  const scope = nock(/apidaze/)
    .head(/mediafiles\/silent.wav/)
    .reply(200, '');

  const client = new MediaFiles(httpMock);
  const { body, statusCode } = await client.summarize(fileName);

  t.deepEqual(body, '');
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.delete deletes a media file', async t => {
  const fileName = 'silent.wav';
  const scope = nock(/apidaze/)
    .delete(/mediafiles\/silent.wav/)
    .reply(204, '');

  const client = new MediaFiles(httpMock);
  const { body, statusCode } = await client.delete(fileName);

  t.deepEqual(body, '');
  t.is(statusCode, 204);
  t.true(scope.isDone());
});

test('.upload uploads a media file', async t => {
  const responseBody = { status: 'OK, file saved.' };
  const scope = nock(/apidaze/)
    .post(/mediafiles/)
    .matchHeader('content-type', /multipart\/form-data/)
    .reply(200, responseBody);

  const filePath = silentWavPath;
  const client = new MediaFiles(httpMock);
  const { body, statusCode } = await client.upload(filePath);

  t.deepEqual(body, responseBody);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.upload uploads a media file along with extra payload', async t => {
  const responseBody = { status: 'OK, file saved.' };
  const scope = nock(/apidaze/)
    .post(/mediafiles/)
    .matchHeader('content-type', /multipart\/form-data/)
    .reply(200, responseBody);

  const filePath = silentWavPath;
  const fileOptions = {
    name: 'silent.wav',
  };
  const client = new MediaFiles(httpMock);
  const { body, statusCode } = await client.upload(filePath, fileOptions);

  t.deepEqual(body, responseBody);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});
