import { combineReducers } from '@reduxjs/toolkit'
import globalEventsReducer from "../slice/globalReducer"

const rootReducer = combineReducers({
  globalEvents: globalEventsReducer,
  // other reducers...
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer