import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Front from './Components/Front';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import History from './Components/History';
import About from './Components/About';


function App() {

  
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Front/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/history' element={ <History/>} />
          <Route exact path='/about' element={ <About/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
