// src/App.tsx
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Modules/Header/Header';
import Footer from './Modules/Footer/Footer';
import HomePage from './Modules/HomePage/HomePage';
import Cabinet from './Modules/Cabinet/Cabinet';
import { ethers, Contract} from 'ethers';

import factory_json from "../../backend/artifacts/contracts/Factory.sol/Factory.json";
import tokens_json from "../../backend/artifacts/contracts/ERC20.sol/Token.json";
import router_json from "../../backend/artifacts/contracts/Router.sol/Router.json";
import staking_json from "../../backend/artifacts/contracts/Staking.sol/Staking.json";
import pool_json from "../../backend/artifacts/contracts/Pool.sol/Pool.json";

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

    const [pools_contracts, set_pools_contracts] = useState<any[] | null>(null);

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

    const get_all_pools = async () => { //получение всех образов пулов и информации о них
        if(FACTORY_contract !== null && provider !== null) {
            const _get_all_pools_addresses = await FACTORY_contract.get_pools();
            const new_pools_contracts = _get_all_pools_addresses.map((pool_address: string) => { //обязательно .map (ассинхронность)
                return new Contract(pool_address, pool_json.abi, provider);
            });
            set_pools_contracts(new_pools_contracts);
        }
    }

    useLayoutEffect(() => { //инициализация
        init_contracts();
    },[provider])

    useEffect(() => {
        get_all_pools();
    }, [provider,FACTORY_contract])

    return (
        <Router>
          <Header 
            signer={signer}
            setSigner={setSigner}
            provider={provider}
            setProvider={setProvider}
            />
            <div>
                <Routes>
                    <Route path="/" element={<HomePage 
                    signer={signer}
                    pools_contracts = {pools_contracts}
                    provider={provider}
                    FACTORY={FACTORY_contract}
                    PROFI={PROFI_contract}
                    />} /> 
                    <Route path="/cabinet" element={<Cabinet
                    signer={signer}
                    provider={provider}
                    FACTORY = {FACTORY_contract}
                    GERDA = {GERDA_contract}
                    KRENDEL = {KRENDEL_contract}
                    RTK = {RTK_contract}
                    PROFI = {PROFI_contract}
                    STAKING = {STAKING_contract}
                    />} />
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
