import { users } from './users'
import { IAuthorizationValues } from './../../interfaces/authorizationTypes'
import { setToken } from './../../actions/tokenAdd'
import store from './../../store/configureStore'

export const logIn = (values: IAuthorizationValues) => {
  if (
    users.some((item) => item.login === values.username) &&
    users.some((item) => item.password === values.password)
  ) {
    const token = Math.floor(Math.random() * 100)
    localStorage.setItem('token', JSON.stringify(token))
    const user = values.username
    localStorage.setItem('user', user)
    console.log('token', token)
    console.log('user', user)
    store.dispatch(setToken(values.username))
  }
}
