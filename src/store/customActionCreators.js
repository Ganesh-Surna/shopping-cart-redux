import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const putRequest=(cart)=>{
    return async(dispatch)=>{
            dispatch(uiActions.setNotification({
                status:"pending",
                title:"Pending...",
                message:"Sending cart data!"
            }));
            async function putHttpRequest(){
                const response= await fetch("https://food-app-a6f82-default-rtdb.firebaseio.com/cart.json",{
                    method: "PUT",
                    body: JSON.stringify({
                        cartItems:cart.cartItems,
                        totalQuantity:cart.totalQuantity
                    }),
                });
        
                if(!response.ok){
                    throw new Error("Error");
                }
            }

        try{
            await putHttpRequest();
            dispatch(uiActions.setNotification({
                status:"success",
                title:"Success!",
                message:"Successfully sent cart data!",
            }));
        }
        catch(err){
            dispatch(uiActions.setNotification({
                status:"error",
                title:"Error!",
                message:"Failed to send cart data!",
            }));
        }
    }
}

export const getRequest=()=>{
    return async(dispatch)=>{

            async function getHttpRequest(){
                const response= await fetch("https://food-app-a6f82-default-rtdb.firebaseio.com/cart.json");
        
                if(!response.ok){
                    console.log("hello");
                    throw new Error("Error");
                }

                const cart=await response.json();
                return cart;
            }

        try{
            const data=await getHttpRequest();
            dispatch(cartActions.replaceCart({items:data.cartItems || [], totalQuantity:data.totalQuantity}));
        }
        catch(err){
            dispatch(uiActions.setNotification({
                status:"error",
                title:"Error!",
                message:"Failed to fetch cart data!",
            }));
        }
    }
}