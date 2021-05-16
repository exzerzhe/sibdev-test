export function deleteRequest(index: number) {
  return {
    type: 'DELETE_REQUEST',
    payload: index,
  }
}
