import { createSlice } from '@reduxjs/toolkit'

export const playingSlice = createSlice({
  name: 'playing',
  initialState: {
    isPlaying: false 
  },
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = state.isPlaying ? false : true
    }
  }
})

// Action creators are generated for each case reducer function
export const { setIsPlaying } = playingSlice.actions

export default playingSlice.reducer