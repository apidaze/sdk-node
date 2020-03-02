const { URL } = require('url');
const test = require('ava');

const Http = require('../../lib/rest/Http');

const API_KEY = 'API_KEY';
const API_SECRET = 'API_SECRET';
const API_URL = 'https://api.apidaze.io/';

test('exports a fuction', t => {
  t.is(typeof Http, 'function');
});

test('returns a Got instance with defaults', t => {
  const client = new Http(API_KEY, API_SECRET, API_URL);
  const { prefixUrl, ...options } = client.defaults.options;

  const expectedBaseUrl = new URL(API_KEY, API_URL);
  const actualBaseUrl = new URL(prefixUrl);

  t.truthy(client);
  t.true(actualBaseUrl.href.startsWith(expectedBaseUrl.href));
  t.true(options.searchParams.hasOwnProperty('api_secret'));
  t.is(options.searchParams['api_secret'], API_SECRET);
  t.is(options.headers['content-type'], 'application/x-www-form-urlencoded');
  t.is(options.retry.limit, 0);
});

test('has a hook trimming the response', t => {
  const client = new Http(API_KEY, API_SECRET, API_URL);
  const { hooks } = client.defaults.options;

  const responseTrimmer = hooks.afterResponse.find(
    hook => hook.name === 'responseTrimmer'
  );
  const expectedResponse = {
    body: [{ id: 1800 }],
    statusCode: 200,
  };

  const rawResponse = {
    ...expectedResponse,
    isFromCache: false,
    retryCount: 0,
  };
  const modifiedResponse = responseTrimmer(rawResponse);

  t.is(hooks.afterResponse.length, 1);
  t.is(typeof responseTrimmer, 'function');
  t.deepEqual(modifiedResponse, expectedResponse);
});
