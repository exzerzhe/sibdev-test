import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store/configureStore'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './history'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
