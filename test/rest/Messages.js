const test = require('ava');
const Messages = require('../../lib/rest/Messages');
const httpMock = require('../../mocks/http');
const nock = require('nock');

test('exports a function', t => {
  t.is(typeof Messages, 'function');
});

test('fails without http client', t => {
  t.throws(() => new Messages(), {
    message: "'http' must be provided.",
  });
});

test('.send sends an SMS', async t => {
  const fixture = {
    ok: true,
    message: 'Message sent',
    details: {
      uuid: '0d706ee2-5dab-4c7c-8203-a56d735f9772',
    },
  };
  const scope = nock(/apidaze/)
    .post(/sms\/send/)
    .reply(200, fixture);

  const client = new Messages(httpMock);
  const { body, statusCode } = await client.send(
    14125423968,
    14125423968,
    'Hello world!'
  );

  t.deepEqual(body, fixture);
  t.is(statusCode, 200);
  t.true(scope.isDone());
});
