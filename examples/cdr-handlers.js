const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // fetch all existing CDR HTTP handlers
  const cdrHandlers = await ApidazeClient.cdrHandlers.list();
  console.log(cdrHandlers);
})();
