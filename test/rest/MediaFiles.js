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
    message: "'http' must be provided.",
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

test('.get fetches a media file', async t => {
  const fileName = 'silent.wav';
  const scope = nock(/apidaze/)
    .get(/mediafiles\/.*\.wav/)
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
    .head(/mediafiles\/.*\.wav/)
    .reply(200, '');

  const client = new MediaFiles(httpMock);
  const { body, statusCode } = await client.summarize(fileName);

  t.deepEqual(body, '');
  t.is(statusCode, 200);
  t.true(scope.isDone());
});
