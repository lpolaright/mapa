export const castObject = (params) => {
  const toUrlParams = (castSource) => () => {
    return Object.keys(castSource)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  }

  return {
    toUrlParams: toUrlParams(params),
  }
};