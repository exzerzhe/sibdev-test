export function saveDataSuccess(data: any, value: string) {
  return {
    type: 'SAVE_DATA_SUCCESS',
    payload: { data: data, value: value },
  }
}

export function saveDataFetching() {
  return {
    type: 'SAVE_DATA_FETCHING',
  }
}
