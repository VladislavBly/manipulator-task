import { createSlice } from "@reduxjs/toolkit";

interface itemSliceType {
    items: number[]
}

const initialState: itemSliceType = {
    items: [],
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItem: (state, action) => {
            const value = action.payload
            state.items.push(value)
        },
        setItemIndex: (state, action) => {
            const {index, position, isRemove} = action.payload
            if(isRemove) state.items[index] = position
            // console.log(isRemove, position)
            
        }
        
    }
})

export const { setItem, setItemIndex } = itemSlice.actions
export default itemSlice.reducer