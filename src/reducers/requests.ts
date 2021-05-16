import { IrequestReducer } from '../interfaces/reducerTypes'

let initialState: IrequestReducer = {
  currentUser: '',
  requests: [],
  index: '',
}

export function requestsReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        currentUser: action.payload,
      }
    case 'SAVE_REQUEST':
      return {
        ...state,
        requests: [...state.requests, action.payload],
      }
    case 'DELETE_REQUEST':
      return {
        ...state,
        requests: state.requests.filter(
          (item: any, index: number) => index !== action.payload
        ),
      }
    case 'SAVE_EDITED_REQUEST':
      state.requests[action.payload.index].maxresults =
        action.payload.values.maxresults
      state.requests[action.payload.index].requestname =
        action.payload.values.requestname
      state.requests[action.payload.index].requestvalue =
        action.payload.values.requestvalue
      state.requests[action.payload.index].sort = action.payload.values.sort
      return {
        ...state,
        requests: state.requests,
      }
    case 'EDIT_REQUEST':
      return {
        ...state,
        index: action.payload,
      }
    case 'FETCH_LOCAL_DATA':
      return {
        ...state,
        requests: JSON.parse(action.payload),
      }
    case 'DELETE_TOKEN':
      return {
        ...state,
        requests: initialState.requests,
      }
    case 'CLOSE_MODAL_WINDOW':
      return {
        ...state,
        index: '',
      }
    default:
      return state
  }
}
