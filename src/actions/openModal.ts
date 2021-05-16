export function openModal(searchValue: string) {
  return {
    type: 'OPEN_MODAL_WINDOW',
    payload: searchValue,
  }
}
