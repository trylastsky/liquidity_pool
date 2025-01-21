// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Modules/Header/Header';
import Footer from './Modules/Footer/Footer';
import HomePage from './Modules/HomePage/HomePage';
import AboutPage from './Modules/AboutPage/AboutPage';
import Cabinet from './Modules/Cabinet/Cabinet';
import { ethers, Contract} from 'ethers';

import factory_json from "../../backend/artifacts/contracts/Factory.sol/Factory.json";

const App: React.FC = () => {
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [provider, setProvider] = useState<ethers.Provider | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    const init_contract = () => {
        const newContract = new Contract(factory_json.address, factory_json.abi, provider);
        setContract(newContract);
        console.log("контракт загружен"+ contract)
    }

    const get_all_pools = async () => {
        if(contract) {
            const _get_all_pools = await contract.getAllAddressPools();
            console.log("Адресса пулов:"+_get_all_pools);
            const info = await _get_all_pools[0].getInfo();
            console.log("ПОлученная информация"+ info);
        }
        else {
            console.log("возникла ошибка при соединении с сервером")
        }
    }


    useEffect(() => {
        console.log("контракт загружается")
        init_contract();
    },[provider])



    return (
        <Router>
            <button onClick={get_all_pools}>ХУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУЙ</button>
          <Header 
            signer={signer}
            setSigner={setSigner}
            provider={provider}
            setProvider={setProvider}
            />
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
