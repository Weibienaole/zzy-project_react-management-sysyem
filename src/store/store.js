import { combineReducers } from 'redux-immutable'
import { reducer as indexReducer } from '../page/core/store'

const reducer = combineReducers({
  index: indexReducer,
})

export default reducer
