import classes from './CartItem.module.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {

  const dispatch=useDispatch();

  const { id, title, quantity, totalPrice, price } = props.item;

  const addingItem={...props.item, quantity:1};

  const handleAddCart=()=>{
    dispatch(cartActions.addCart(addingItem));
  };

  const handleRemoveCart=()=>{
    dispatch(cartActions.removeCart(id));
  };

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
          <button onClick={handleRemoveCart}>-</button>
          <button onClick={handleAddCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
