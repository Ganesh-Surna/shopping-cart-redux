import { configureStore } from "@reduxjs/toolkit";
import cartToggleReducer from "./cartShowToggle-slice";
import cartReducer from "./cart-slice";

const store=configureStore({
    reducer:{
        cartToggleKey:cartToggleReducer,
        cartKey:cartReducer,
    },
});

export default store;