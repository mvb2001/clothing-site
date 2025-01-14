import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/products">Products</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
