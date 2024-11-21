import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js"

const appStore = configureStore({
    reducer: {           
        cart: cartReducer, //Root reducer combining all slice reducers into one
    },
});

export default appStore