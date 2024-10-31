import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HistoryItem = {
  command: string;
  optimizationedCommand: string;
  items: string;
  prevItems: string;
  date: string;
}


export interface activeGridType {
  active: number;
  pick: boolean;
  pickIndex: number;
  history: HistoryItem[];
  speed: number
}

interface setActivePayloadType {
  input: number 
  rows: number; 
  columns: number
}

interface commandPayloadType {
  input: string 
  rows: number; 
  columns: number
}

interface setPickIndexPayloadType{
  pickIndex:number
}

interface setHistoryPayloadType{
  command: string
  items: string
  prevItems: string
  optimizationedCommand: string
}


const initialState: activeGridType = {
  active: 2,
  pick:false,
  pickIndex:0,
  history: [],
  speed: 600,
};

const activeGridSlice = createSlice({
  name: 'activeGrid',
  initialState,
  reducers: {
    setActive: (state, action:PayloadAction<setActivePayloadType>) => {
      const { input, rows, columns } = action.payload;
      const max = rows * columns;
      let valueIndex = input
      if (input > max){
        valueIndex = max
      } else if (input < 1){
        valueIndex = 1
      }
      state.active = valueIndex
    },

    setCommand: (state, action:PayloadAction<commandPayloadType>) => {
      const { input, rows, columns } = action.payload;
      let value = state.active
      const max = rows * columns;

      switch (input) {
        case 'П':
          if( !(value + 1 > max)) value += 1 
          break
        case 'Л':
          if( !(value - 1 < 1)) value -= 1
          break
        case 'Н':
          if( !(value + columns > max)) value += columns
          break
        case 'В':
          if( !(value - columns < 1)) value -= columns
          break
        case 'О':
          state.pick = true
          break
        case 'Б':
          state.pick = false
          state.pickIndex = -1
          break
      }  
      state.active = value
    },
    setPickIndex: (state, action:PayloadAction<setPickIndexPayloadType>) => {
      const {pickIndex} = action.payload
      state.pickIndex = pickIndex
    },
    setHistory: (state, action:PayloadAction<setHistoryPayloadType>) => {
      const { command, items, prevItems ,optimizationedCommand} = action.payload;
      state.history.unshift({
        command:command,
        optimizationedCommand:optimizationedCommand,
        items:items,
        prevItems:prevItems,
        date: new Date().toLocaleString()
      })
      
    },
    setSpeed: (state, action:PayloadAction<{speed:number}>) => {
      const {speed} = action.payload
      state.speed = speed
    }
  },
});

export const { setActive, setCommand, setPickIndex, setHistory, setSpeed } = activeGridSlice.actions;
export default activeGridSlice.reducer;
