export function saveEditedRequest(values: any, index: number) {
  return {
    type: 'SAVE_EDITED_REQUEST',
    payload: { values: values, index: index },
  }
}
