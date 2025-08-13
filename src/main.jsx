import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";
import {store} from'./lib/store';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-react'


import HomePage from './pages/home.page.jsx';
import SignInPage from './pages/sign-in.page';
import SignUpPage from './pages/sign-up.page';
import ShopPage from './pages/shop.page';
import RootLayout from './layout/Root.Layout';
import CartPage from './pages/cart.page';
import CheckoutPage from './pages/checkout.page';
import ProtectedLayout from './layout/Protected.Layout.jsx';
import CreateProductPage from './pages/createProduct.page.jsx';
import AdminProtectedLayout from './layout/Admin-protected.Layout.jsx';
import ProductView from './components/ProductView';

 // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>
        <BrowserRouter>
                  <Routes>
            <Route element={<RootLayout/>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:category" element={<ShopPage />} />
              <Route path="/shop/cart" element={<CartPage/>} />
              <Route path="/product/:productId" element={<ProductView />} />
              <Route path="/sign-In" element={<SignInPage />} />
              <Route path="/sign-Up" element={<SignUpPage />} />
            </Route>
            
            <Route element={<ProtectedLayout/>}>
              <Route path="shop/checkout" element={<CheckoutPage/>} />
              <Route element={<AdminProtectedLayout/>}>
                <Route path="/admin/products/create" element={<CreateProductPage />} />
              </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
    </ClerkProvider>
  </StrictMode>,
);
