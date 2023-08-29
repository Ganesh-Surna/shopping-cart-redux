import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { sendCartDataCustomActionCreator } from './store/cart-slice';

let isInitial = true; // this is very important ... outside of component

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart); //cart items from redux store
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    

    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartDataCustomActionCreator(cart));


  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;