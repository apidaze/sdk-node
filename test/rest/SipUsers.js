const test = require('ava');
const SipUsers = require('../../lib/rest/SipUsers');
const httpMock = require('../../mocks/http');
const nock = require('nock');

const sipUser1 = {
  id: 1,
  name: 'SIP Account #1',
  callerid: {
    outboundCallerIdName: 'SIP Account #1',
    outboundCallerIdNumber: '123412341234',
    internalCallerIdName: 'SIP Account #1',
    internalCallerIdNumber: '1234',
  },
  sip: { username: 'sip_account1' },
  created_at: '2020-03-30T10:49:52.000Z',
  updated_at: '2020-03-30T10:49:52.000Z',
};

const sipUser2 = {
  id: 2,
  name: 'SIP Account #2',
  callerid: {
    outboundCallerIdName: 'SIP Account #2',
    outboundCallerIdNumber: '123312331233',
    internalCallerIdName: 'SIP Account #2',
    internalCallerIdNumber: '1233',
  },
  sip: { username: 'sip_account2' },
  created_at: '2020-03-30T10:49:52.000Z',
  updated_at: '2020-03-30T10:49:52.000Z',
};

const userList = [sipUser1, sipUser2];

test('exports a fuction', t => {
  t.is(typeof SipUsers, 'function');
});

test('fails without http client', t => {
  t.throws(() => new SipUsers(), {
    message: "'http' must be provided.",
  });
});

test('has convenient methods to manage SIP users', t => {
  const client = new SipUsers(httpMock);

  const methods = [
    client.list,
    client.create,
    client.delete,
    client.get,
    client.update,
  ];

  methods.forEach(method => {
    t.truthy(method);
    t.is(typeof method, 'function');
  });
});

test('.list fetches SIP users', async t => {
  const scope = nock(/apidaze/)
    .get(/sipusers/)
    .reply(200, userList);

  const client = new SipUsers(httpMock);
  const { body: users, statusCode } = await client.list();

  t.deepEqual(users, userList);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});

test('.update updates a SIP user', async t => {
  const id = 2;
  const changes = {
    name: 'Updated SIP User',
  };
  const fixture = {
    ...sipUser1,
    ...changes,
  };

  const scope = nock(/apidaze/)
    .put(new RegExp(`sipusers/${id}`))
    .reply(202, fixture);

  const client = new SipUsers(httpMock);
  const { body: updatedUser, statusCode } = await client.update(id, changes);

  t.deepEqual(updatedUser, fixture);
  t.is(statusCode, 202);
  t.true(scope.isDone());
});

test('.create creates a SIP user', async t => {
  const user = {
    name: sipUser1.name,
    outbound_caller_id_number: sipUser1.callerid.outboundCallerIdNumber,
    internal_caller_id_number: sipUser1.callerid.internalCallerIdNumber,
    username: sipUser1.sip.username,
  };
  const scope = nock(/apidaze/)
    .post(/sipusers/)
    .reply(201, sipUser1);

  const client = new SipUsers(httpMock);
  const { body: createdUser, statusCode } = await client.create(user);

  t.deepEqual(createdUser, sipUser1);
  t.is(statusCode, 201);
  t.true(scope.isDone());
});

test('.delete deletes a SIP user', async t => {
  const id = 1;
  const scope = nock(/apidaze/)
    .delete(new RegExp(`sipusers/${id}`))
    .reply(204, '');

  const client = new SipUsers(httpMock);
  const { body, statusCode } = await client.delete(1);

  t.deepEqual(body, '');
  t.is(statusCode, 204);
  t.true(scope.isDone());
});

test('.get fetches a SIP user', async t => {
  const id = sipUser1.id;
  const scope = nock(/apidaze/)
    .get(new RegExp(`sipusers/${id}`))
    .reply(200, sipUser1);

  const client = new SipUsers(httpMock);
  const { body: user, statusCode } = await client.get(1);

  t.deepEqual(user, sipUser1);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});
