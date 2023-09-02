import classes from './CartItem.module.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const { id, title, quantity, totalPrice, price } = props.item;

  const dispatch=useDispatch();

  function handleAddItemToCart(){
    dispatch(cartActions.addItemToCart({...props.item, quantity:1}));
  }

  function handleRemoveItemFromCart(){
    dispatch(cartActions.removeItemFromCart(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveItemFromCart} >-</button>
          <button onClick={handleAddItemToCart} >+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
