import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useDispatch, useSelector } from 'react-redux';
import { putRequest, getRequest } from './store/customActionCreators';

let isFirstTime = true;

function App() {
  const dispatch = useDispatch();

  const isShowCart = useSelector(state => state.uiKey.isShowCart);
  const notification = useSelector(state => state.uiKey.notification);
  const cart = useSelector(state => state.cartKey);

  useEffect(()=>{
    dispatch(getRequest());
  },[dispatch]);

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;
      return;
    }

    if (cart.isChanged) {
      dispatch(putRequest(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && <main className={`notification ${notification.status === "error" ? "error" : ""} ${notification.status === "success" ? "success" : ""}`}>
        <h2>{notification.title}</h2>
        <p>{notification.message}</p>
      </main>}
      <Layout>
        {isShowCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
