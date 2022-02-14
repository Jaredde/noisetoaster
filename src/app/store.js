import { configureStore } from '@reduxjs/toolkit'
import playingReducer from '../reducers/playingSlice'

export default configureStore({
  reducer: {
    playing: playingReducer
  }
})