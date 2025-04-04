import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-200'>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;