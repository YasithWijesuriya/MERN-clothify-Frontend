import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from './pages/home.page.jsx';
import SignInPage from './pages/sign-in.page';
import SignUpPage from './pages/sign-up.page';
import ShopPage from './pages/shop.page';
import RootLayout from './layout/Root.Layout';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route element={<RootLayout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop">
          <Route path=":category" element={<ShopPage/>} />
        </Route>
      </Route>
      <Route path="/sign-In" element={<SignInPage />} />
      <Route path="/sign-Up" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
);
