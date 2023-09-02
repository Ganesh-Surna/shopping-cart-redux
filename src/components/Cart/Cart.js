import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = () => {

  const cartItems=useSelector(state=>state.cartKey.cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {
          cartItems.map((cartItem)=>{
            return <CartItem key={cartItem.id} item={cartItem} />
          })
        }
      </ul>
    </Card>
  );
};

export default Cart;
