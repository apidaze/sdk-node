const test = require('ava');
const Calls = require('../../lib/rest/Calls');
const httpMock = require('../../mocks/http');
const nock = require('nock');

test('exports a fuction', t => {
  t.is(typeof Calls, 'function');
});

test('fails without http client', t => {
  t.throws(() => new Calls(), {
    message: "'http' must be provided.",
  });
});

test('.make makes a call', async t => {
  const fixture = { ok: '2b89cb8c-a315-41d9-a3d3-3bf432c14610' };
  const scope = nock(/apidaze/)
    .post(/calls/)
    .reply(202, fixture);

  const client = new Calls(httpMock);
  const { body, statusCode } = await client.make({
    callerId: '123456789',
    origin: '987654321',
    destination: '987654321',
    type: 'number',
  });

  t.deepEqual(body, fixture);
  t.is(statusCode, 202);
  t.true(scope.isDone());
});

test('.list fetches the list of active calls', async t => {
  const fixture = [
    {
      uuid: '2b89cb8c-a315-41d9-a3d3-3bf432c14610',
      created: '2020-02-01 23:34:19',
      cid_name: 'Outbound Call',
      cid_num: '987654321',
      dest: '987654321',
      callstate: 'ACTIVE',
      call_uuid: '2b89cb8c-a315-41d9-a3d3-3bf432c14610',
      callerid: '123456789',
      URL: 'http://f25093a8.eu.ngrok.io/script.xml',
      work_tag: '<wait/>',
    },
  ];
  const scope = nock(/apidaze/)
    .get(/calls/)
    .reply(200, fixture);

  const client = new Calls(httpMock);
  const { body, statusCode } = await client.list();

  t.deepEqual(body, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.get fetches an active call with the given UUID', async t => {
  const fixture = {
    uuid: '2b89cb8c-a315-41d9-a3d3-3bf432c14610',
    created: '2020-02-01 23:34:19',
    cid_name: 'Outbound Call',
    cid_num: '987654321',
    dest: '987654321',
    callstate: 'ACTIVE',
    call_uuid: '2b89cb8c-a315-41d9-a3d3-3bf432c14610',
    callerid: '123456789',
    URL: 'http://f25093a8.eu.ngrok.io/script.xml',
    work_tag: '<wait/>',
  };
  const scope = nock(/apidaze/)
    .get(/calls\/2b89cb8c-a315-41d9-a3d3-3bf432c14610/)
    .reply(200, fixture);

  const client = new Calls(httpMock);
  const { body, statusCode } = await client.get(
    '2b89cb8c-a315-41d9-a3d3-3bf432c14610'
  );

  t.deepEqual(body, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.delete terminates an active call with the given UUID', async t => {
  const fixture = { ok: '' };
  const scope = nock(/apidaze/)
    .delete(/calls\/2b89cb8c-a315-41d9-a3d3-3bf432c14610/)
    .reply(202, fixture);

  const client = new Calls(httpMock);
  const { body, statusCode } = await client.delete(
    '2b89cb8c-a315-41d9-a3d3-3bf432c14610'
  );

  t.deepEqual(body, fixture);
  t.is(statusCode, 202);
  t.true(scope.isDone());
});
