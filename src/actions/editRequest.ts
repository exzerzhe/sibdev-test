export function editRequest(index: number) {
  return {
    type: 'EDIT_REQUEST',
    payload: index,
  }
}
