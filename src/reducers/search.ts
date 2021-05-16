import { IsearchReducer } from '../interfaces/reducerTypes'

let initialState: IsearchReducer = {
  data: null,
  searchValue: null,
  modalOpened: false,
  getSuffix: false,
  isFetching: false,
}

export function searchReducer(
  state: IsearchReducer = initialState,
  action: any
) {
  switch (action.type) {
    case 'SAVE_DATA_FETCHING':
      return {
        ...state,
        isFetching: true,
        getSuffix: false,
      }
    case 'SAVE_DATA_SUCCESS':
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        searchValue: action.payload.value,
        getSuffix: false,
      }
    case 'CLOSE_MODAL_WINDOW':
      return {
        ...state,
        modalOpened: false,
      }
    case 'EDIT_REQUEST':
      return {
        ...state,
        modalOpened: true,
      }
    case 'CLEAR_DATA':
      return {
        ...state,
        data: initialState.data,
        searchValue: initialState.searchValue,
        modalOpened: initialState.modalOpened,
      }
    case 'SAVE_REQUEST':
      return {
        ...state,
        getSuffix: true,
      }
    case 'OPEN_MODAL_WINDOW':
      return {
        ...state,
        modalOpened: true,
        searchValue: action.payload,
      }
    default:
      return state
  }
}
