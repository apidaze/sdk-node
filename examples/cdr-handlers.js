const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // create a CDR HTTP handler
  const createdCdrHandler = await ApidazeClient.cdrHandlers.create({
    url: 'http://example.com/handle',
    name: 'A new CDR handler'
  });
  console.log(createdCdrHandler);

  // fetch all existing CDR HTTP handlers
  const cdrHandlers = await ApidazeClient.cdrHandlers.list();
  console.log(cdrHandlers);
  const firstCdrHandler = cdrHandlers.body[0];

  // update a CDR HTTP handler
  const updatedCdrHandler = await ApidazeClient.cdrHandlers.update(firstCdrHandler.id, {
    url: 'http://example.com/handle_call',
    name: 'The CDR handler'
  });
  console.log(updatedCdrHandler);
})();
