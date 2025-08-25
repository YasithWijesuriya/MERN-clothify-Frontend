import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import { store } from './lib/store';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-react';

// Pages & Components
import RootLayout from './layout/Root.Layout';
import HomePage from './pages/home.page.jsx';
import ShopPage from './pages/shop.page';
import SignInPage from './pages/sign-in.page';
import SignUpPage from './pages/sign-up.page';
import CartPage from './pages/cart.page';
import CheckoutPage from './pages/checkout.page';
import CreateProductPage from './pages/createProduct.page.jsx';
import ProductView from './components/ProductView';
import AboutUs from './components/AboutUs.jsx';
import Contact from './components/ContactUs.jsx';
import Gallery from './components/Gallery.jsx';
import OrderConfirmation from './components/orderConfirmation';
import MyOrders from './components/MyOrders';
import AdminOrders from './components/AdminOrders';
import SalesDashboard from './components/AdminDailySalesDashboard';

// Layouts
import ProtectedLayout from './layout/Protected.Layout.jsx';
import AdminProtectedLayout from './layout/Admin-protected.Layout.jsx';

// Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route element={<RootLayout />}>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Shop */}
              <Route path="shop" element={<ShopPage showHero={false} showInspiration={false} />} />
              <Route path="shop/:category" element={<ShopPage showHero={false} showInspiration={false} />} />
              <Route path="shop/:category/:colorSlug" element={<ShopPage showHero={false} showInspiration={false} />} />

              {/* Static */}
              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="gallery" element={<Gallery />} />

              {/* Cart */}
              <Route path="cart" element={<CartPage />} />

              {/* Product detail */}
              <Route path="product/:productId" element={<ProductView />} />

              {/* Auth */}
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />

              {/* Protected */}
              <Route element={<ProtectedLayout />}>
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="checkout/order-confirmation/:id" element={<OrderConfirmation />} />
                <Route path="my-orders" element={<MyOrders />} />

                {/* Admin */}
                <Route element={<AdminProtectedLayout />}>
                  <Route path="admin/products/create" element={<CreateProductPage />} />
                  <Route path="admin/orders" element={<AdminOrders />} />
                  <Route path="admin/sales-dashboard" element={<SalesDashboard />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>,
);