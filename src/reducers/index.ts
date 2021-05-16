import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { requestsReducer } from './requests'
import { searchReducer } from './search'

export const rootReducer = combineReducers({
  auth: authReducer,
  data: searchReducer,
  requests: requestsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
