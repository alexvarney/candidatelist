import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import './App.css';
import Navbar from './components/Navbar';

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}

export default AppRouter;




