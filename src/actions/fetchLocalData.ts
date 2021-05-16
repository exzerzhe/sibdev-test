export function fetchLocalData(localData: any) {
  return {
    type: 'FETCH_LOCAL_DATA',
    payload: localData,
  }
}
