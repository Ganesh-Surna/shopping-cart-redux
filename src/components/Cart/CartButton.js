import classes from './CartButton.module.css';

import { useDispatch } from 'react-redux';
import { cartToggleActions } from '../../store/cartShowToggle-slice';

import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch=useDispatch();

  const totalQuantity=useSelector((state)=>state.cartKey.totalQuantity);

  const handleCartShow=()=>{
    dispatch(cartToggleActions.toggleShowCart());
  }
  return (
    <button onClick={handleCartShow} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
