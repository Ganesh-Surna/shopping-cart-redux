import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = () => {
  const dispatch=useDispatch();

  const totalQuantity=useSelector(state=>state.cartKey.totalQuantity)

  const handleToggle=()=>{
    dispatch(uiActions.showCart()); //execute not just point
  }

  return (
    <button onClick={handleToggle} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
