import { createSlice } from "@reduxjs/toolkit"

const rowsLimits = {min: 3, max: 8};
const columnsLimits = {min: 3, max: 8}; 
    
const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        rows: rowsLimits.max,
        columns: columnsLimits.max
    },
    reducers: {
        setRows(state, action) {
            let value = action.payload
            if (value < rowsLimits.min) {
                value = rowsLimits.min;
            } else if (value > rowsLimits.max) {
                value = rowsLimits.max;
            }
            state.rows = value
        },
        setColumns(state, action) {
            let value = action.payload
            if(value < columnsLimits.min){
                value = columnsLimits.min
            } else if ( value > columnsLimits.max){
                value = columnsLimits.max
            }
            state.columns = value
        }
    }
})

export const { setRows, setColumns } = gridSlice.actions
export default gridSlice.reducer