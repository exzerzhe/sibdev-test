import { Switch, Route, Redirect } from 'react-router-dom'
import React, { useEffect } from 'react'
import Authorization from './components/authorization'
import { useDispatch, useSelector } from 'react-redux'
import Main from './pages/main'
import { setToken } from './actions/tokenAdd'
import { RootState } from './reducers'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useSelector((state: RootState) => state.auth?.currentUser)

  useEffect(() => {
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('user')
    if (token && user) {
      dispatch(setToken(user))
    }
  }, [dispatch])
  return (
    <Switch>
      <Route path="/login" component={Authorization} />
      <Route
        path="/"
        render={() =>
          localStorage.getItem('token') ? <Main /> : <Redirect to="/login" />
        }
      />
    </Switch>
  )
}
export default App
