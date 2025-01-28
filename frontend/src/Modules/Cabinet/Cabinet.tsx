/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import './Cabinet.css';
import buy_token from '../../services/token/buy_token';
import set_stake from '../../services/staking/set_stake';
import { ethers } from 'ethers';
import get_RW from '../../services/staking/get_RW';

interface cabinet_interface {
    signer:any | null;
    provider: any | null;
    FACTORY:any | null;
    GERDA:any| null;
    KRENDEL:any| null;
    RTK:any | null;
    PROFI:any | null;
    STAKING:any | null;
}

const Cabinet: React.FC<cabinet_interface> = ({
    signer,
    provider,
    FACTORY,
    GERDA,
    KRENDEL,
    RTK,
    PROFI,
    STAKING
    }) => {
    const [user_name, set_user_name] = useState<string>();
    const [ETH_balance, set_ETH_balance] = useState<number>(0);
    const [GERDA_balance, set_GERDA_balance] = useState<number>(0);
    const [KRENDEL_balance, set_KRENDEL_balance] = useState<number>(0);
    const [RTK_balance, set_RTK_balance] = useState<number>(0);
    const [PROFI_balance, set_PROFI_balance] = useState<number>(0);

    const get_info_cabinet = async () => {
        const _user = await FACTORY?.user(signer.address); //получение имени пользователя
        
        const _WEI_balance = await provider?.getBalance(signer.address);
        const _GERDA_balance = await GERDA?.balanceOf(signer.address);
        const _KRENDEL_balance = await KRENDEL?.balanceOf(signer.address);
        const _RTK_balance = await RTK?.balanceOf(signer.address);
        const _PROFI_balance = await PROFI?.balanceOf(signer.address);
        
        set_user_name(_user);
        set_ETH_balance(Number(_WEI_balance) / 10**18); //ethers.formatEther () - барахлит
        set_GERDA_balance(Number(_GERDA_balance) / 10**12);
        set_KRENDEL_balance(Number(_KRENDEL_balance) / 10**12);
        set_RTK_balance(Number(_RTK_balance) /10**12);
        set_PROFI_balance(Number(_PROFI_balance) / 10**6);
    }


    useEffect(() => {
        get_info_cabinet()
    },[signer,provider,FACTORY,GERDA,KRENDEL,RTK,PROFI])

    
    return (
        <div className="cabinet-container">
            <h2>Личный кабинет</h2>

            {signer ? (
                <div>
                    <h3>{user_name}</h3>
                    <p>Адрес аккаунта: {signer.address}</p>
                    <p>Баланс:</p>
                    <p>ETH: {ETH_balance}</p>
                    <p>GERDA: {GERDA_balance}</p>
                    <p>KRENDEL: {KRENDEL_balance}</p>
                    <p>RTK: {RTK_balance}</p>
                    <div>
                        <h4>Покупка валюты</h4>
                        <button onClick={() => buy_token(signer, GERDA, set_GERDA_balance)}>GERDA</button>
                        <button onClick={() => buy_token(signer, KRENDEL, set_KRENDEL_balance)}>KRENDEL</button>
                        <button onClick={() => buy_token(signer, RTK, set_RTK_balance)}>RTK</button>
                        <h4>Staking</h4>
                        <p>Баланс PROFI: {PROFI_balance}</p>
                        <button onClick={() => set_stake(signer, STAKING)}>Запуск стэйкинга</button>
                        <button onClick={() => get_RW(signer, STAKING)}>Получить вознаграждение</button>
                    </div>
                </div>
            ) : (
                <p>Адрес аккаунта не найден. Пожалуйста, подключите кошелек.</p> 
            )}
        </div>
    );
};

export default Cabinet;
