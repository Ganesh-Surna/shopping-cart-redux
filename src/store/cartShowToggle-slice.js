import { createSlice } from "@reduxjs/toolkit";

const initialCartToggleState={isCartShow:false};

const cartToggleSlice=createSlice({
    name:"cartUi",
    initialState:initialCartToggleState,
    reducers:{
        toggleShowCart(state){
            state.isCartShow=!state.isCartShow;
        }
    }
});

export const cartToggleActions=cartToggleSlice.actions;

export default cartToggleSlice.reducer;