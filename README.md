# Apidaze Node.js SDK

[![Node.js CI](https://github.com/apidaze/sdk-node/workflows/Node.js%20CI/badge.svg)](https://github.com/apidaze/sdk-node/actions?query=workflow%3A%22Node.js+CI%22)

Apidaze Node.js SDK contains a client for Apidaze REST API as well as an XML script builder. The SDK allows you to leverage all Apidaze platform features such as making calls, sending text messages, serving IVR systems, and many others in your application. The SDK also includes examples that demonstrate how to use the SDK.

## Supported Node.js Versions

- Node.js 10
- Node.js 12

## Installation

To install Apidaze Node.JS SDK as a dependency from the current master branch, type the following;

`npm install apidaze/sdk-node`

## Quickstart

### Instantiation

First, we need to instantiate an Apidaze client;

```javascript
const { Apidaze } = require('apidaze');

const client = new Apidaze('API_KEY', 'API_SECRET');
```

The first and the second argument in `Apidaze` class must be replaced with the real ones from your Apidaze application.

### Update the external script

If one needs to update an Apidaze application's external script URL, the following snippet may be used;

```javascript
const response = await client.externalScripts.update('script_id', {
    url: 'https://example.com/script',
});
```

### Send an SMS

```javascript
const destination = '14125423968';
const origin = '14125423968';
const message = 'Hello world!';

const response = await ApidazeClient.messages.send(origin, destination, message);
```

### Place a call

```javascript
const callerId = '14125423968';
const origin = '1234567890';
const destination = '1234567890';
const type = 'number';

const response = await ApidazeClient.calls.make({
  callerId,
  destination,
  origin,
  type
});
```

### Script builder

The script builder is used to build XML instructions described in [the XML Scripting Reference](https://apidocs.voipinnovations.com). To build an instruction which echo back received audio to the caller with some delay use the following code.

```javascript
const { ScriptBuilder, ScriptNodes } = require('apidaze');
const { Answer, Speak, Echo } = ScriptNodes;

const script = new ScriptBuilder();

const answer = new Answer();
const speak = new Speak('Thank you for trying our demo. Have an wonderful day!');
const echo = new Echo(500);

const xmlDocument = script
  .add(answer)
  .add(speak)
  .add(echo)
  .toString();
```

The code above will produce the following XML;

```xml
<document>
  <work>
    <answer>
    </answer>
    <speak>Thank you for trying our demo. Have an wonderful day!</speak>
    <echo>500</echo>
  </work>
</document>
```

## More examples

Check out [examples](examples) in JavaScript for possible implementations and quick demonstrations. For the examples, one may benefit from [dotenv](npmjs.com/package/dotenv) to have a smoother experience in usage.

## Testing

All tests can be run with the following command;

`npm test`

If a coverage report is desired, the following command would be suitable;

`npm run test:coverage`

To run specific test files, run `npm test` with a JavaScript regular expression matching the file names, like;

`npm test ./test/rest/M*`