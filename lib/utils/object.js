module.exports = {
  /**
   * Shallow object merger function
   *
   * @param {Object} objectA - The first base object
   * @param {Object} objectB - The second object to merge over the first
   *
   * @return {Object} An object with the merged properties from objectA and objectB
   */
  merge: (objectA, objectB) => ({ ...objectA, ...objectB }),
};
