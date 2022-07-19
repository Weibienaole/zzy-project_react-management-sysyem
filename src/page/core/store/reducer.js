import { } from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  // type: 0
})

const reducer = (state = defaultState, action) => {
  switch(action.type){
    // case SET_NAV_TYPE:
    //   return state.set('type', action.data)
    default:
      return state
  }
}
export default reducer