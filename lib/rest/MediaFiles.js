const fs = require('fs');
const FormData = require('form-data');
const { merge } = require('../utils/object');

/**
 * @classdesc MediaFiles client
 * @constructs MediaFiles
 * @memberof Apidaze
 * @param {Got} baseHttpClient - A got instance to manage HTTP requests
 *
 * @return {MediaFiles}
 */
function MediaFiles(baseHttpClient) {
  if (!baseHttpClient) {
    throw new Error("'baseHttpClient' must be provided.");
  }

  const http = baseHttpClient.extend({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * @alias MediaFiles#endpoint
   * @type string
   * @memberof MediaFiles
   */
  this.endpoint = 'mediafiles';

  /**
   * Gets media files
   * @async
   * @param {Object} [searchParams]
   * @param {number} [searchParams.maxItems] - Max number of files to return.
   * If this limit is reached for a response, a List-Truncation-Token response
   * header will contain the token to use in a subsequent call
   * with the last_token property.
   * @param {Boolean} [searchParams.details] - Include size and modified date
   * in response data.
   * @param {string} [searchParams.filter] - Response data will only include
   * files matching exact string to filter.
   * @param {string} [searchParams.lastToken] - This should only be used if you
   * are continuing a partial request., Supply the value from a previous
   * request's List-Truncation-Token response header to continue with
   * partitioned data.
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.list = async (searchParams = {}) => {
    if (!(typeof searchParams === 'object' && searchParams !== null)) {
      throw new Error(`'searchParams' must be an object!`);
    }

    const paramMap = {
      maxItems: 'max_items',
      lastToken: 'last_token',
    };

    const mappedSearchParams = Object.entries(searchParams).reduce(
      (params, entry) => {
        const [key, value] = entry;

        const newKey = paramMap[key] || key;

        return {
          ...params,
          [newKey]: value,
        };
      },
      {}
    );

    const requestOptions = {
      searchParams: mappedSearchParams,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return http.get(this.endpoint, requestOptions);
  };

  /**
   * Gets a media file
   * @async
   * @param {string} id - The media file's ID
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.get = async (id, options) => {
    const requestOptions = merge(
      {
        responseType: 'buffer',
      },
      options
    );

    return http.get(`${this.endpoint}/${id}`, requestOptions);
  };

  /**
   * Summarize a media file
   * @async
   * @param {string} id - The media file's ID
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.summarize = async (id, options) => {
    return http.head(`${this.endpoint}/${id}`, options);
  };

  /**
   * Deletes a media file
   * @async
   * @param {string} id - The media file's ID
   * @param {GotRequestOptions} options - The request options
   *
   * @return {Promise<Response>}
   */
  this.delete = async (id, options) => {
    return http.delete(`${this.endpoint}/${id}`, options);
  };

  /**
   * Uploads a media file
   * @async
   * @param {Buffer} filePath - The media file's absolute path to upload
   * @param {Object} [payload]
   * @param {string} [payload.name] - The media file's name
   * @param {GotRequestOptions} options - The request options
   *
   */
  this.upload = async (filePath, payload = {}, options) => {
    const stream = fs.createReadStream(filePath);
    const form = new FormData();
    const fileOptions = {
      contentType: 'audio/wav',
    };

    form.append('mediafile', stream, fileOptions);

    if (payload.name) {
      form.append('name', payload.name);
    }

    const requestOptions = merge(
      {
        body: form,
        headers: form.getHeaders(),
      },
      options
    );

    return http.post(this.endpoint, requestOptions);
  };

  return this;
}

module.exports = MediaFiles;
