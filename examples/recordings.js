const fs = require('fs');
const path = require('path');
const { Apidaze } = require('../');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const ApidazeClient = new Apidaze(API_KEY, API_SECRET);

(async () => {
  // list existing recordings
  const recordingsResponse = await ApidazeClient.recordings.list();
  console.log(recordingsResponse);
  const firstRecording = recordingsResponse.body[0];

  // fetch a recording
  const recordingResponse = await ApidazeClient.recordings.get(firstRecording);
  console.log(recordingResponse);

  // save the file in the project root
  const fileContent = recordingResponse.body;
  fs.writeFile(path.resolve(`${__dirname}/../${firstRecording}`), fileContent, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('The file has been saved!');
  });

  // delete a recording
  const deletedRecordingResponse = await ApidazeClient.recordings.delete(firstRecording);
  console.log(deletedRecordingResponse);
})();
