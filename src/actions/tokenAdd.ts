export function setToken(currentUsername: string) {
  return {
    type: 'SET_TOKEN',
    payload: currentUsername,
  }
}
