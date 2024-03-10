import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CuisineListing } from './pages/CuisineListing/CuisineListing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DishDetails from './pages/DishDetails/DishDetails';
import { Header } from './components/Header/Header';


function App() {
  return (
    <div className="App">
   

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CuisineListing />} />
          <Route path='/dish/:id' element={<DishDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
