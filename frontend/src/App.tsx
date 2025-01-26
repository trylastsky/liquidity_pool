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
import tokens_json from "../../backend/artifacts/contracts/ERC20.sol/Token.json";
import router_json from "../../backend/artifacts/contracts/Router.sol/Router.json";
import staking_json from "../../backend/artifacts/contracts/Staking.sol/Staking.json";

const App: React.FC = () => {
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [provider, setProvider] = useState<ethers.Provider | null>(null);

    const [GERDA_contract, set_GERDA_contract] = useState<ethers.Contract | null>(null);
    const [KRENDEL_contract, set_KRENDEL_contract] = useState<ethers.Contract | null>(null);
    const [RTK_contract, set_RTK_contract] = useState<ethers.Contract | null>(null);
    const [PROFI_contract, set_PROFI_contract] = useState<ethers.Contract | null>(null);
    const [FACTORY_contract, set_FACTORY_contract] = useState<ethers.Contract | null>(null);
    const [ROUTER_contract, set_ROUTER_contract] = useState<ethers.Contract | null>(null);
    const [STAKING_contract, set_STAKING_contract] = useState<ethers.Contract | null>(null);

    const init_contracts = () => {
        try {
            const FACTORY = new Contract(factory_json.address, factory_json.abi, provider);
            const GERDA = new Contract(tokens_json.gerda, tokens_json.abi, provider);
            const KRENDEL = new Contract(tokens_json.krendel, tokens_json.abi, provider);
            const RTK = new Contract(tokens_json.rtk, tokens_json.abi, provider);
            const PROFI = new Contract(tokens_json.profi, tokens_json.abi, provider);
            const ROUTER = new Contract(router_json.address, router_json.abi, provider);
            const STAKING = new Contract(staking_json.address, staking_json.abi, provider);
            set_FACTORY_contract(FACTORY);
            set_GERDA_contract(GERDA);
            set_KRENDEL_contract(KRENDEL);
            set_RTK_contract(RTK);
            set_PROFI_contract(PROFI);
            set_ROUTER_contract(ROUTER);
            set_STAKING_contract(STAKING)

        }
        catch(e) {
            console.log(e);
        }
    }

    const get_all_pools = async () => {
        if(FACTORY_contract) {
            const _get_all_pools = await FACTORY_contract.getAllAddressPools();
            console.log(_get_all_pools[0]);
            const info = await _get_all_pools[0].getInfo();
            console.log(info);
            
        }
        else {
            "Возникла ошибка при соединении с сервером";
        }
    }


    useEffect(() => {
        init_contracts();
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
