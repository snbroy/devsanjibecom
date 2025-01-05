import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/global/Navbar/Navbar';
import ProductListing from './pages/ProductListing';
import CollectionPage from './pages/CollectionPage';
import SingleProductPage from './pages/SingleProductPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Service from './pages/Service';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import CheckoutForm from './components/CheckoutForm';
import { CreateContextApi } from './context/MyContextApi';
import { useContext } from 'react';
import Checkout from './pages/Checkout/Checkout';
import ThankYou from './pages/ThankYou';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AuthRoute from './components/AuthRoute';
import AccountPage from './components/AccountPage';

function App() {
  const context = useContext(CreateContextApi);
  const { offset } = context;
  console.log(offset,"offset")
  return (
    <div className={ `main-content ${offset ? 'offset' : ''}`}>
      <Navbar />
      <div className={`page-content`}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/collection/all" element={<ProductListing />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/collection/:id" element={<CollectionPage />} />
          <Route exact path="/product/:id" element={<SingleProductPage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/services" element={<Service />} />
          <Route exact path="/cart" element={<CheckoutForm />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path='/login' element={<AuthRoute><AccountPage /></AuthRoute>} />
          <Route exact path='/account' element={<AuthRoute><AccountPage /></AuthRoute>} />
          <Route exact path="/signup" element={<RegisterPage />} />
          <Route exact path="/thank-you" element={
            <PrivateRoute>
            <ThankYou />
          </PrivateRoute>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
