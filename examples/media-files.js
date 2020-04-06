const fs = require('fs');
const path = require('path');
const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // fetch the list of media files
  const { body: mediaFiles } = await ApidazeClient.mediaFiles.list();
  console.log('list of media files', mediaFiles);
  const firstMediaFile = mediaFiles[0];

  // get a media file
  const { body: mediaFile } = await ApidazeClient.mediaFiles.get(firstMediaFile);
  console.log('the fetched media file', mediaFile);


  // save the media file in the project root
  fs.writeFile(path.resolve(`${__dirname}/../${firstMediaFile}`), mediaFile, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('The file has been saved!');
  });

  // summarize a media file
  const mediaFileSummary = await ApidazeClient.mediaFiles.summarize(firstMediaFile)
  console.log('the media file summary', mediaFileSummary);
})();
