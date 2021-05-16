export type IsearchReducer = {
  data: any,
  searchValue: any,
  modalOpened: boolean,
  getSuffix: boolean,
  isFetching: boolean,
}
export type IrequestReducer = {
  currentUser: string,
  requests: any,
  index: any,
}
export type IauthReducer = {
  wrongUser: boolean,
  currentUser: any,
}
