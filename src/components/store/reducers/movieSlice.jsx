import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  info: null,
}

export const movieSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loadmovie:(state,action)=>{
        state.info = action.payload
    },
    removemovie:(state,action)=>{
        state.info = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadmovie,removemovie } = movieSlice.actions

export default movieSlice.reducer