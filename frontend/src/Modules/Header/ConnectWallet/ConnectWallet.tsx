import React, {useEffect } from 'react';

import {ethers} from "ethers";

import { Connect_interface } from '../../../global';

import "./ConnectWallet.css";

const ConnectWallet: React.FC<Connect_interface> = ({
    signer,
    setSigner,
    provider,
    setProvider
}) => {

    const init_provider = () => { //инициализация провайдера
        if(window.ethereum) { 
            const _provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(_provider);
        }
        else {
            setProvider(null);
            alert("Установите расширение для блокчейна Metamask");
        }
    }

 

    const connect_wallet = async () => {
        const signer = await provider.getSigner(); 
        setSigner(signer); 
        localStorage.setItem('status_auth', JSON.stringify(true));
    }

    const check_status_auth = () => { //проверка совершен ли вход пользователем
        const _status_auth = localStorage.getItem('status_auth');
        if(_status_auth) {
            connect_wallet(); //если сессия была то подключаем снова
        }
    }

    const disconnect_wallet = () => { 
        const confirm = window.confirm("Вы точно хотите выйти из аккаунта?"); 
        if (confirm) { 
            setSigner(null); 
            localStorage.removeItem('status_auth');
        }
    }


    useEffect(() => { //для вызова стартовых функций при рендеринге страницы
        init_provider();
    }, []);

    useEffect(() => { //для событий 
        if (!window.ethereum) return; //отменяем выполнение useEffect если нет Metamask;
        check_status_auth();//проверка сессии
        window.ethereum?.on('accountsChanged', connect_wallet); //смена аккаунта в кошельке
    
        return () => {    //размонтирование событий после размонтирования компонента
            window.ethereum.removeListener('accountsChanged', connect_wallet);
        }
    }, [provider]); //в скобочки указываем переменные которые используются в функциях


    return (
        <div style={{paddingLeft: "20px"}} className='ConnectWallet'>
            {signer ? (
                <div>
                    <span style={{ cursor: 'pointer', color: 'green', marginRight: "20px" }} >
                        Адрес Кошелька: <span style={{ color: 'white' }}>{signer.address.slice(0,12)}...{signer.address.slice(-4)}</span>
                    </span>
                    <button  id='Disconnect' className="button" onClick={disconnect_wallet}>
                        Выход
                    </button>
               
                </div>
                    ) : (
                <button className="button" onClick={connect_wallet}>Войти в Кошелек</button>
            )}
        </div> 
    );
};

export default ConnectWallet;
