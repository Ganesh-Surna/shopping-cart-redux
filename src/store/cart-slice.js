import { createSlice } from "@reduxjs/toolkit";

const initialCartState={items:[], totalQuantity:0};

const cartSlice=createSlice({
    name:"cart",
    initialState:initialCartState,
    reducers:{
        addCart(state, action){
            const newItem=action.payload;
            const existingItem=state.items.find((item)=>{
                return item.id===newItem.id;
            });
            if(!existingItem){
                state.items.push({
                    id:newItem.id,
                    title:newItem.title,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                });
            }
            else{
                existingItem.quantity++;
                existingItem.totalPrice+=newItem.price;
            }
            state.totalQuantity++;
        },
        removeCart(state, action){
            const id=action.payload;
            const existingItemIndex=state.items.findIndex((item)=>{
                return item.id===id;
            });
            const existingItem=state.items[existingItemIndex];
            if(existingItem.quantity===1){
                state.items.splice(existingItemIndex,1);
            }
            else{
                existingItem.totalPrice-=existingItem.price;
                existingItem.quantity--;
            }
            state.totalQuantity--;
        }
    }
});

export const cartActions=cartSlice.actions;

export default cartSlice.reducer;