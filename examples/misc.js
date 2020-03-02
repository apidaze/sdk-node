const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // validate the provided api key and secret
  const validationResponse = await ApidazeClient.misc.validate();
  console.log(validationResponse);
})();
