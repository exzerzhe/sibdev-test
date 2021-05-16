import { IauthReducer } from './../interfaces/reducerTypes'
let initialState: IauthReducer = {
  wrongUser: false,
  currentUser: '',
}

export function authReducer(state: IauthReducer = initialState, action: any) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        currentUser: action.payload,
        wrongUser: false,
      }
    case 'DELETE_TOKEN':
      return {
        ...state,
        currentUser: initialState.currentUser,
        wrongUser: false,
      }
    case 'WRONG_LOGIN':
      return {
        ...state,
        wrongUser: true,
      }
    default:
      return state
  }
}
