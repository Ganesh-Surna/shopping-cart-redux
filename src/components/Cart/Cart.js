import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = (props) => {

  const cartItems=useSelector((state)=>state.cartKey.items);
  const totalQuantity=useSelector((state)=>state.cartKey.totalQuantity);

  let content=<p>Your Cart is Empty.</p>

  if(totalQuantity>0){
    content=
    <ul>
      {cartItems.map((cartItem)=>{
        return <CartItem
                  item={{
                    id:cartItem.id,
                    title: cartItem.title, 
                    quantity: cartItem.quantity, 
                    totalPrice: cartItem.totalPrice, 
                    price: cartItem.price 
                  }}
                />
      })}
    </ul>
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {content}
    </Card>
  );
};

export default Cart;
