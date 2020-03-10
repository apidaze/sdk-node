
const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // list the existing external scripts
  const externalScripts = await ApidazeClient.externalScripts.list();
  console.log(externalScripts);
  const firstExternalScript = externalScripts.body[0];

  // update an external script
  const updatedExternalScript = await ApidazeClient.externalScripts.update(firstExternalScript.id, {
    url: 'https://example.com/script',
    name: 'A sample external script'
  });
  console.log(updatedExternalScript);
})();
