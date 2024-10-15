// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Modules/Header/Header';
import Footer from './Modules/Footer/Footer';
import HomePage from './Modules/HomePage/HomePage';
import AboutPage from './Modules/AboutPage/AboutPage';
import Cabinet from './Modules/Cabinet/Cabinet';

const App: React.FC = () => {
    return (
        <Router>
          <Header/>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} /> 
                    <Route path="/about" element={<><AboutPage/></>}/>
                    <Route path="/cabinet" element={<Cabinet />} />
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
