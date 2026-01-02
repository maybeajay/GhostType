import { combineReducers } from '@reduxjs/toolkit'
import globalEventsReducer from "../slice/globalReducer"
import TextReducer from '../slice/textSlice'
const rootReducer = combineReducers({
  globalEvents: globalEventsReducer,
  textSlice: TextReducer,
  // other reducers...
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer