const path = require('path');
const { readFileSync } = require('fs');
const { Apidaze } = require('..');
const serve = require('./server');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const DID = process.env.DID;
const MY_PHONE = process.env.MY_PHONE;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

const sleep = async (ms) => new Promise((resolve => setTimeout(resolve, ms)));

(async () => {
  const echoScriptPath = path.resolve(path.join(__dirname, './dial-plans/echo.xml'));
  const echoScript = readFileSync(echoScriptPath, 'utf8');
  serve({ '/': () => echoScript });

  const callerId = DID;
  const origin = MY_PHONE;
  const destination = MY_PHONE;
  const type = 'number';

  // place a call
  const { body: { ok: callUuid }} = await ApidazeClient.calls.make({
    callerId,
    destination,
    origin,
    type
  });
  console.log('the placed call UUID', callUuid);

  // give the call some time
  await sleep(5000);

  // fetch all active calls
  const { body: list } = await ApidazeClient.calls.list();
  console.log('the call list', list);

  // fetch the active call
  const { body: call } = await ApidazeClient.calls.get(callUuid);
  console.log('the call', call);

  // give the parties some time to talk
  await sleep(5000);

  // terminate the active call
  const deletedResponse = await ApidazeClient.calls.delete(callUuid);
  console.log('termination response', deletedResponse);
})();
