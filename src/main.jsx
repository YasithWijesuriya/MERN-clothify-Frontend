import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AboutUs from './components/AboutUs.jsx';
import Contact from './components/ContactUs.jsx';
import Gallery from './components/Gallery.jsx';
import OrderConfirmation from './components/orderConfirmation';
import MyOrders from './components/MyOrders';
import AdminOrders from './components/AdminOrders';
import SalesDashboard from './components/AdminDailySalesDashboard';


 // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>
        <BrowserRouter>
      <Routes>

     <Route element={<RootLayout />}>
  {/* Home page */}
  <Route path="/" element={<HomePage />} />

  {/* Shop routes */}
  <Route path="shop/:category/:colorSlug?" element={<ShopPage />} />
  <Route path="shop/:category" element={<ShopPage />} />
  <Route path="shop" element={<ShopPage />} />

  {/* Other pages */}
  <Route path="about" element={<AboutUs />} />
  <Route path="contact" element={<Contact />} />
  <Route path="gallery" element={<Gallery />} />
  <Route path="shop/cart" element={<CartPage />} /> 
  <Route path="my-orders" element={<MyOrders />} />
  <Route path="admin/orders" element={<AdminOrders />} />

  {/* Product detail */}
  <Route path="product/:productId" element={<ProductView />} />

  {/* Auth */}
  <Route path="sign-in" element={<SignInPage />} />
  <Route path="sign-up" element={<SignUpPage />} />

  {/* Protected routes */}
  <Route element={<ProtectedLayout />}>
    <Route path="shop/checkout" element={<CheckoutPage />} />
    <Route path="shop/checkout/order-confirmation/:id" element={<OrderConfirmation />} />

    <Route element={<AdminProtectedLayout />}>
      <Route path="admin/products/create" element={<CreateProductPage />} />
      <Route path="admin/sales-dashboard" element={<SalesDashboard />} />
    </Route>
  </Route>
</Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </ClerkProvider>
  </StrictMode>,
);
