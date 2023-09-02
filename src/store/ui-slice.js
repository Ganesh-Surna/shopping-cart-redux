import { createSlice } from "@reduxjs/toolkit";

const initialUiState={
    isShowCart:false,
    notification:null,
}

const uiSlice= createSlice({
    name:"ui",
    initialState:initialUiState,
    reducers:{
        showCart(state){
            state.isShowCart=!state.isShowCart;
        },
        setNotification(state,action){
            state.notification={
                status:action.payload.status,
                title:action.payload.title,
                message:action.payload.message,
            };
        }
    }
});

export const uiActions= uiSlice.actions;

export default uiSlice.reducer;