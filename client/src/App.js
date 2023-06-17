import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confiramtion from "./scenes/checkout/Confiramtion";
import Navbar from "./scenes/global/Navbar";
import CartMenu from './scenes/global/CartMenu';
import Footer from "./scenes/global/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0,0);
  },[pathname])
  return null;
}


function App() {
  return (
    <div className="app">
      <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={ <Home/>}></Route>
          <Route path="/item/:itemId" element={ <ItemDetails/>}></Route>
          <Route path="/checkout" element={ <Checkout/> }></Route>
          <Route path="/checkout/success" element={<Confiramtion/> }></Route>
          <Route path="/" element={ <Home/>}></Route>
        </Routes>
        <CartMenu />
        <Footer />
    </div>
  );
}

export default App;
