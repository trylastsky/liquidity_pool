import React, { useState } from 'react';

import {ethers} from "ethers";
import factory_json from "../../../../backend/artifacts/contracts/Factory.sol/Factory.json";

import "./AboutPage.css";



const AboutPage: React.FC = () => {
    const [pools, setPools] = useState<string[]>([]);

    const handleGetPools = async () => {
        try {
            // Подключение к провайдеру (например, Metamask)
            const provider = new ethers.BrowserProvider(global?.window?.ethereum);
            // Запрос разрешения на доступ к счетам
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            console.log(signer.address);

            // Создайте экземпляр контракта
            const contract = new ethers.Contract(factory_json.address, factory_json.abi, provider);

            // Вызовите функцию контракта для получения пулов ликвидности
            const getPools = await contract.getAllAddressPools();
            setPools(getPools);
        } catch (error) {
            console.error("Ошибка при получении пулов:", error);
        } 
    };

    return (
        <div className='container'>
                <button onClick={handleGetPools}>Получить пулы ликвидности</button>
                <div style={{backgroundColor: "red", display: "flex",flexDirection:"column"}}>
                {pools.map((item,key) => {
                    return <p key={key}>{item}</p>
                })}
                </div>
        </div>
    );
};

export default AboutPage;
