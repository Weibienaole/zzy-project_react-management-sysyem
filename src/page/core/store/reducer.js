import { SET_THEME_KEY } from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  themeKey: window.localStorage.getItem('themeKey') || 0
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case SET_THEME_KEY:
    return state.set('themeKey', action.data)
  default:
    return state
  }
}
export default reducer
