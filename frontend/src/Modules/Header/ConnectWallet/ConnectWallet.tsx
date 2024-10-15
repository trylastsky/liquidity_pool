import React, { useState, useEffect } from 'react';
import "./ConnectWallet.css";

interface ConnectWalletProps {
    setAccount: (account: string | null) => void; // Добавлен пропс setAccount
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setAccount }) => {
    const [account, setLocalAccount] = useState<string | null>(null);

    useEffect(() => {
        const storedAccount = localStorage.getItem('walletAccount');
        if (storedAccount) {
            setLocalAccount(storedAccount);
            setAccount(storedAccount); // Установить состояние в Header
        }

        window.ethereum?.on('accountsChanged', (accounts: string[]) => {
            if (accounts.length > 0) {
                setLocalAccount(accounts[0]);
                setAccount(accounts[0]); // Установить состояние в Header
                localStorage.setItem('walletAccount', accounts[0]);
            } else {
                setLocalAccount(null);
                setAccount(null); // Установить состояние в Header
                localStorage.removeItem('walletAccount'); 
            }
        });
        
        return () => {
            window.ethereum?.removeListener('accountsChanged', () => {});
        };
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const selectedAccount = accounts[0];
                setLocalAccount(selectedAccount);
                setAccount(selectedAccount); // Установить состояние в Header
                localStorage.setItem('walletAccount', selectedAccount);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert('Пожалуйста, установите Metamask');
        }
    };

    const copyAddress = async () => {
        if (account) {
            try {
                await navigator.clipboard.writeText(account);
                confirm('Копировать Адрес ' + '"' + account + '"' + '?');
            } catch (err) {
                console.error('Failed to copy: ', err);

            }
        }
    };

    const disconnectWallet = () => {
        setLocalAccount(null);
        setAccount(null); // Установить состояние в Header
        localStorage.removeItem('walletAccount');
    };

    return (
        <div style={{paddingLeft: "20px"}} className='ConnectWallet'>
            {account ? (
                <div>
                    <span style={{ cursor: 'pointer', color: 'green', marginRight: "20px" }} onClick={copyAddress}>
                        Адрес Кошелька: <span style={{ color: 'white' }}>{account.slice(0, 6)}...{account.slice(-4)}</span>
                    </span>
                    <button  id='Disconnect' className="button" onClick={disconnectWallet}>
                        Выход
                    </button>
                </div>
            ) : (
                <button className="button" onClick={connectWallet}>
                    Войти в Кошелек
                </button>
            )}
        </div>
    );
};

export default ConnectWallet;
