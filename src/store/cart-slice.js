import { createSlice } from '@reduxjs/toolkit';

import { uiActions } from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export const sendCartDataCustomActionCreator=(cart)=>{

    return (dispatch)=>{
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        fetch(
            'https://food-app-a6f82-default-rtdb.firebaseio.com/cart.json',
            {
                method: 'PUT',
                body: JSON.stringify(cart),
            }
        ).then(()=>{
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        }).catch((error)=>{
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        })
    }
}

// export const sendCartDataCustomActionCreator=(cart)=>{
    // return async (dispatch)=>{
    //     dispatch(
    //         uiActions.showNotification({
    //           status: 'pending',
    //           title: 'Sending...',
    //           message: 'Sending cart data!',
    //         })
    //     );

    //     const sendHttpRequest=async()=>{
    //         const response = await fetch(
    //             'https://food-app-a6f82-default-rtdb.firebaseio.com/cart.json',
    //             {
    //                 method: 'PUT',
    //                 body: JSON.stringify(cart),
    //             }
    //         );
    
    //         if (!response.ok) {
    //             throw new Error('Sending cart data failed.');
    //         }
    //     };

    //     try{
    //         await sendHttpRequest();
    //         dispatch(
    //             uiActions.showNotification({
    //                 status: 'success',
    //                 title: 'Success!',
    //                 message: 'Sent cart data successfully!',
    //             })
    //         );
    //     }
    //     catch(error){
    //         dispatch(
    //             uiActions.showNotification({
    //                 status: 'error',
    //                 title: 'Error!',
    //                 message: 'Sending cart data failed!',
    //             })
    //         );
    //     }
    // }
// }

export const cartActions = cartSlice.actions;

export default cartSlice;