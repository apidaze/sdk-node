const test = require('ava');
const nock = require('nock');
const fs = require('fs');
const path = require('path');

const Recordings = require('../../lib/rest/Recordings');
const httpMock = require('../../mocks/http');
const silentWavPath = path.resolve(`${__dirname}/../fixtures/silent.wav`);
const silentWavFixture = fs.readFileSync(silentWavPath);

test('exports a fuction', t => {
  t.is(typeof Recordings, 'function');
});

test('fails without http client', t => {
  t.throws(() => new Recordings(), {
    message: "'http' must be provided.",
  });
});

test('has Recordingsellaneous methods to support in general', t => {
  const client = new Recordings(httpMock);

  const methods = [client.list, client.get, client.delete];

  methods.forEach(method => {
    t.truthy(method);
    t.is(typeof method, 'function');
  });
});

test('.list fetches recordings', async t => {
  const fixture = [
    '0c8c2b1b-7d85-4d0f-9caf-8da640a2fdd4.wav',
    '2e7f0567-d4e9-4b9c-b55d-6f7da69ee440.wav',
    'ff9ac74b-a622-4699-90b5-9dea837f7994.wav',
  ];
  const scope = nock(/apidaze/)
    .get(/recordings/)
    .reply(200, fixture);

  const client = new Recordings(httpMock);
  const { body, statusCode } = await client.list();

  t.deepEqual(body, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.get fetches a recording', async t => {
  const fileName = '0c8c2b1b-7d85-4d0f-9caf-8da640a2fdd4.wav';
  const scope = nock(/apidaze/)
    .get(/recordings\/.*\.wav/)
    .reply(200, silentWavFixture);

  const client = new Recordings(httpMock);
  const { body, statusCode } = await client.get(fileName);

  t.deepEqual(body, silentWavFixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.delete deletes a recording', async t => {
  const fileName = '0c8c2b1b-7d85-4d0f-9caf-8da640a2fdd4.wav';
  const scope = nock(/apidaze/)
    .delete(/recordings\/.*\.wav/)
    .reply(204, '');

  const client = new Recordings(httpMock);
  const { body, statusCode } = await client.delete(fileName);

  t.deepEqual(body, '');
  t.is(statusCode, 204);
  t.true(scope.isDone());
});
