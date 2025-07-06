import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";
import {store} from'./lib/store';
import { Provider } from 'react-redux';

import HomePage from './pages/home.page.jsx';
import SignInPage from './pages/sign-in.page';
import SignUpPage from './pages/sign-up.page';
import ShopPage from './pages/shop.page';
import RootLayout from './layout/Root.Layout';
import CartPage from './pages/cart.page';
import CheckoutPage from './pages/checkout.page';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
        <Routes>
            <Route element={<RootLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop">
              <Route path=":category" element={<ShopPage/>} />
              <Route path="cart" element={<CartPage/>} />
              <Route path="checkout" element={<CheckoutPage/>} />
            </Route>
          </Route>
          <Route path="/sign-In" element={<SignInPage />} />
          <Route path="/sign-Up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
