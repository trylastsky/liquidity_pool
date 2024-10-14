import React, { useState, useEffect } from 'react';
import "./ConnectWallet.css";

const ConnectWallet: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);

    useEffect(() => {
        const storedAccount = localStorage.getItem('walletAccount');
        if (storedAccount) {
            setAccount(storedAccount);
        }

        window.ethereum?.on('accountsChanged', (accounts: string[]) => {
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                localStorage.setItem('walletAccount', accounts[0]);
            } else {
                setAccount(null);
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
                setAccount(selectedAccount);
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
                confirm('Копировать Адрес ' + '"'+account+'"' +'?');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        localStorage.removeItem('walletAccount');
    };

    return (
        <div className='ConnectWallet'>
            {account ? (
                <div>
                    <span style={{ cursor: 'pointer', color: 'green', marginRight: "20px" }} onClick={copyAddress}>
                        Адрес Кошелька: <span style={{ color: 'white' }}>{account.slice(0, 6)}...{account.slice(-4)}</span>
                    </span>
                    <button id='Disconnect' className="button" onClick={disconnectWallet}>
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
