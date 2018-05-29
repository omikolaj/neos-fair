export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const getQueryParams = () => {
  const params = window.location.search.substring(1);
  let paramPairs = {};
  params.split("&").map((str) => str.split("="))
                          .map((arr) => {
                            return paramPairs[[arr[0]]] = arr[1]
                          });
  if('token' in paramPairs){
    return paramPairs    
  }
  if('error' in paramPairs){
    return {error: decodeURIComponent(paramPairs.error)}
  }
  return null  
}