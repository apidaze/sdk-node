const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // fetch the list of sub-applications
  const { body: apps } = await ApidazeClient.applications.list();
  console.log('list of sub-apps', apps);
  const firstApp = apps[0];

  // fetch sub-apps by the given API key
  const { body: [appByApiKey] } = await ApidazeClient.applications.getByApiKey(firstApp.api_key);
  console.log('an app by api key', appByApiKey);

  // fetch sub-apps by the given name
  const { body: [appByName] } = await ApidazeClient.applications.getByName(firstApp.name)
  console.log('an app by name', appByName);

  // fetch sub-apps by the given id
  const { body: [appById] } = await ApidazeClient.applications.getById(firstApp.id);
  console.log('an app by id', appById);

  // usage of a new Apidaze client with a fetched sub-app
  const {
    api_key: apiKey,
    api_secret: apiSecret
  } = appById;

  // instantiate a new Apidaze client with the sub-app's credentials
  const AnotherApidazeClient = new Apidaze(apiKey, apiSecret);

  // try out the new Apidaze client
  const externalScripts = await AnotherApidazeClient.externalScripts.list();
  console.log(externalScripts);
})();
