import { createSlice } from "@reduxjs/toolkit";

const initialCartState={
    cartItems:[],
    totalQuantity:0,
    isChanged:false,
};

const cartSlice=createSlice({
    name:"cart",
    initialState:initialCartState,
    reducers:{
        replaceCart(state,action){
            state.cartItems=action.payload.items;
            state.totalQuantity=action.payload.totalQuantity;
        },
        addItemToCart(state,action){
            const newItem=action.payload;
            const existingItem=state.cartItems.find((item)=>{
                return item.id===newItem.id;
            });
            if(!existingItem){
                state.cartItems.push({
                    id:newItem.id,
                    title:newItem.title,
                    price:newItem.price,
                    quantity:1,
                    description:newItem.description,
                    totalPrice:newItem.price,
                })
            }
            else{
                existingItem.quantity++;
                existingItem.totalPrice+=existingItem.price;
            }
            state.totalQuantity++;
            state.isChanged= true;
        },
        removeItemFromCart(state,action){
            const id=action.payload;
            const existingItemIndex=state.cartItems.findIndex((item)=>{
                return item.id===id;
            });
            const existingItem=state.cartItems[existingItemIndex];
            if(existingItem.quantity===1){
                state.cartItems.splice(existingItemIndex,1);
            }
            else{
                existingItem.totalPrice-=existingItem.price;
                existingItem.quantity--;
            }
            state.totalQuantity--;
            state.isChanged= true;
        }
    }
});

export default cartSlice.reducer;

export const cartActions= cartSlice.actions;
