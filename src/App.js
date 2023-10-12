import './App.css';
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from "./container/Home";
import Resources from './container/Resources';
import Headnav from "./components/Headnav"
import Signup from "./components/Signup"
import Loginuser from "./components/Loginuser"
import Profile from "./components/Profile"

import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import Onejob from './components/Onejob';
import About from './components/About';
import Contact from "./components/Contact";
// import { BiLogIn } from 'react-icons/bi';


function App() {
  const [isLoggedIn, setLoggedin] = useState(true);


  return (
    <div className="App">

      <Navbar isLoggedIn={isLoggedIn} />

      <Routes>

        <Route exact path="/" element={<Home />} />

        <Route exact path="/courses" element={<Resources />} />

        <Route exact path="/jobs" element={<Headnav />} />

        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/login" element={<Loginuser />} />

        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/onejob" element={<Onejob />} />

            <Route exact path="/about" element={<About />} />

            <Route exact path="/contact" element={<Contact />} />

      </Routes>

      <Footer />


    </div>
  );
}

export default App;
