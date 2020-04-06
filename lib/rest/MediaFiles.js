/**
 * @classdesc MediaFiles client
 * @constructs MediaFiles
 * @memberof Apidaze
 * @param {Got} http - A got instance to manage HTTP requests
 *
 * @return {MediaFiles}
 */
function MediaFiles(http) {
  if (!http) {
    throw new Error("'http' must be provided.");
  }

  /**
   * @alias MediaFiles#endpoint
   * @type string
   * @memberof MediaFiles
   */
  this.endpoint = 'mediafiles';

  /**
   * Gets media files
   * @async
   * @return {Promise<Response>}
   */
  this.list = async () => {
    return http.get(this.endpoint);
  };

  /**
   * Gets a media file
   * @async
   * @param {string} id - The media file's ID
   * @return {Promise<Response>}
   */
  this.get = async id => {
    return http.get(`${this.endpoint}/${id}`, {
      responseType: 'buffer',
    });
  };

  /**
   * Summarize a media file
   * @async
   * @param {string} id - The media file's ID
   * @return {Promise<Response>}
   */
  this.summarize = async id => {
    return http.head(`${this.endpoint}/${id}`);
  };

  return this;
}

module.exports = MediaFiles;
