const isEmpty = (value) => {
  const isNullOrUndefined = (value === undefined || value === null);
  const isEmptyObject = (typeof value === 'object' && Object.keys(value).length === 0);
  const isEmptyString = (typeof value === 'string' && value.trim().length === 0);
  return ( isNullOrUndefined || isEmptyObject || isEmptyString );
}

module.exports = isEmpty;
