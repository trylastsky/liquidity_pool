// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Modules/Header/Header';
import Footer from './Modules/Footer/Footer';
import HomePage from './Modules/HomePage/HomePage';
import AboutPage from './Modules/AboutPage/AboutPage';
import Cabinet from './Modules/Cabinet/Cabinet';
import { ethers} from 'ethers';

const App: React.FC = () => {
    const [signer, setSigner] = useState<ethers.Signer | null>();
    const [provider, setProvider] = useState<ethers.Provider | null>();
    const [contract, setContract] = useState<ethers.Contract>();
    // const [chain, setChain] 

    return (
        <Router>
          <Header 
            signer={signer}
            setSigner={setSigner}
            provider={provider}
            setProvider={setProvider}/>
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
