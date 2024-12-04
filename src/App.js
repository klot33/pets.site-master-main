import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FindPets from './components/FindPets';
import Footer from './components/Footer';
import Header from './components/Header';
import Slider from './components/Slider';
import SubscriptionNews from './components/SubscriptionNews';
import SearchPets from './components/SearchPets';
import AddPets from './components/AddPets';
import React from 'react';
import MyAccount from './pages/MyAccount';
import ForgotPassword from './components/ForgotPassword';
import ForgotLogin from './components/ForgotLogin';

function Home() {
  return (
    <>
      <Slider />
      <FindPets />
      <SubscriptionNews />
      <ForgotLogin />
      <ForgotPassword />
    </>
  );
}

function AddPet() {
  return <AddPets />;
}

function Search() {
  return <SearchPets />;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
