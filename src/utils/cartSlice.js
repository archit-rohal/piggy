import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            // mutating the state here
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            //either mutate the existing state or return a new state
            // so this is also valid - state.items.length = 0;
            return {items: []};
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions; //exporting actions here

export default cartSlice.reducer;