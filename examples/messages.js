const { Apidaze } = require('..');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  const destination = '14125423968';
  const origin = '14125423968';
  const message = 'Hello world!';

  const options = {
    timeout: 1000,
  };

  // send an SMS
  const messageResponse = await ApidazeClient.messages.send(
    origin,
    destination,
    message,
    options
  );
  console.log(messageResponse);
})();
