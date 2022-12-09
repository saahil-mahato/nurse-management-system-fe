/**
 * Function to trim string or strings in array or objects.
 *
 * @param {any} object - The variable to be trimmed.
 * @returns {any}
 */
const deepTrim = (object: any) => {
  const objectClone = object;
  if (typeof objectClone === 'string') {
    return objectClone.trim();
  }
  if (typeof objectClone === 'object') {
    Object.keys(objectClone).forEach((key: any) => {
      objectClone[key] = deepTrim(objectClone[key]);
    });
  }

  return objectClone;
};

export default deepTrim;
