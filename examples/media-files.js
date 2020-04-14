const fs = require('fs');
const path = require('path');
const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // upload a media file
  const filePath = path.resolve(`${__dirname}/../anything.wav`);
  const options = { 'name': 'sample-silent-2.wav' };
  const uploadedFile = await ApidazeClient.mediaFiles.upload(filePath, options);
  console.log('the uploaded media file', uploadedFile)

  // fetch the list of media files
  const { body: mediaFiles, headers } = await ApidazeClient.mediaFiles.list({ maxItems: 2 });
  console.log('the list of media files', mediaFiles, 'headers', headers);
  const firstMediaFile = mediaFiles[0];

  // get a media file
  const { body: mediaFile } = await ApidazeClient.mediaFiles.get(firstMediaFile);
  console.log('the fetched media file buffer', mediaFile);


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

  // delete a user
  const deletedMediaFileResponse = await ApidazeClient.mediaFiles.delete(firstMediaFile);
  console.log('the deleted media file', deletedMediaFileResponse);
})();
