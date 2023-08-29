import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData=()=>{
    return async (dispatch)=>{
        const fetchHttp=async ()=>{
            const response=await fetch('https://food-app-a6f82-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error("Fetching cart data failed");
            }

            const data= await response.json();

            return data;
        };
        try{
            const cartData=await fetchHttp();
            dispatch(cartActions.replaceCart({
                items:cartData.items || [], // items should not be undefined
                totalQuantity:cartData.totalQuantity,
            }));
        }
        catch(error){
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }

    };
};

export const sendCartDataCustomActionCreator=(cart)=>{
    return async (dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: 'pending',
              title: 'Sending...',
              message: 'Sending cart data!',
            })
        );

        const sendHttpRequest=async()=>{
            const response = await fetch(
                'https://food-app-a6f82-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );
    
            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        };

        try{
            await sendHttpRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        }
        catch(error){
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    }
};

// export const sendCartDataCustomActionCreator=(cart)=>{

//     return (dispatch)=>{
//         dispatch(
//             uiActions.showNotification({
//                 status: 'pending',
//                 title: 'Sending...',
//                 message: 'Sending cart data!',
//             })
//         );

//         fetch(
//             'https://food-app-a6f82-default-rtdb.firebaseio.com/cart.json',
//             {
//                 method: 'PUT',
//                 body: JSON.stringify(cart),
//             }
//         ).then(()=>{
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'success',
//                     title: 'Success!',
//                     message: 'Sent cart data successfully!',
//                 })
//             );
//         }).catch((error)=>{
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'error',
//                     title: 'Error!',
//                     message: 'Sending cart data failed!',
//                 })
//             );
//         })
//     }
// }