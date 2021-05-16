import { IauthReducer } from './../interfaces/reducerTypes'
let initialState: IauthReducer = {
  currentUser: '',
}

export function authReducer(state: IauthReducer = initialState, action: any) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        currentUser: action.payload,
      }
    case 'DELETE_TOKEN':
      return {
        ...state,
        currentUser: initialState.currentUser,
      }
    default:
      return state
  }
}
