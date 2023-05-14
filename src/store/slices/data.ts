import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IData } from '../../interfaces';

// Define a type for the slice state
interface CounterState {
  data: Array<IData>;
}

// Define the initial state using that type
const initialState: CounterState = {
  data:[]
}

export const dataSlice = createSlice({
  name: 'data',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Array<IData>>) => {
       state.data =  action.payload;
    },
  },
})

export const { setData } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;