import React, {useEffect } from 'react';
import {ethers} from "ethers";
import { Connect_interface } from '../../../global';
import "./ConnectWallet.css";

const ConnectWallet: React.FC<Connect_interface> = ({signer,setSigner,provider,setProvider }) => {

    
    const init_provider = async () => { 
        if(window.ethereum) { 
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider);
        }
        else { 
            setProvider(null);
            alert("Установите расширение для блокчейна Metamask");
        }
    }

    const check_signer_of_memory = () => {
        const _signer = localStorage.getItem('signer');
        if(_signer) {
            setSigner(JSON.parse(_signer));
        }
    }


    const connect_wallet = async () => { 
        const signer = await provider.getSigner(); 
        setSigner(signer); 
        localStorage.setItem('signer', JSON.stringify(signer));
    }

    const disconnect_wallet = () => { 
        const confirm = window.confirm("Вы точно хотите выйти из аккаунта?"); 
        if (confirm) { 
            setSigner(null); 
            localStorage.removeItem('signer');
        }
    }


    useEffect(() => { //для функций
        init_provider();
        check_signer_of_memory();
    }, []);

    useEffect(() => { //для событий #пофиксить !!! 
 
        const change_signer_event = () => {
            console.log(signer);
            console.log(provider);
            connect_wallet();        
        }

        window.ethereum?.on('accountsChanged', change_signer_event);

        //размонтирование событий после размонтирования компонента
        return () => { 
            window.ethereum.removeListener('accountsChanged', change_signer_event);
        }
    }, []);


    return (
        <div style={{paddingLeft: "20px"}} className='ConnectWallet'>
            {signer ? (
                <div>
                    <span style={{ cursor: 'pointer', color: 'green', marginRight: "20px" }} >
                        Адрес Кошелька: <span style={{ color: 'white' }}>{signer.address.slice(0, 6)}...{signer.address.slice(-4)}</span>
                    </span>
                    <button  id='Disconnect' className="button" onClick={disconnect_wallet}>
                        Выход
                    </button>
                </div>
            ) : (
                <button className="button" onClick={connect_wallet}>
                    Войти в Кошелек
                </button>
            )}
        </div>
    );
};

export default ConnectWallet;
