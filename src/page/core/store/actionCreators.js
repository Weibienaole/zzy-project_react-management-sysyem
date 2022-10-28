import { fromJS } from 'immutable'
import { SET_THEME_KEY } from './constants'

export const setThemeKey = (key) => ({
  type: SET_THEME_KEY,
  data: key
})
