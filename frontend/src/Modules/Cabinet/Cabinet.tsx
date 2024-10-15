import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './Cabinet.css';

const Cabinet: React.FC = () => {
    const account = localStorage.getItem('walletAccount'); 
    const [balances, setBalances] = useState<{ [key: string]: number }>({});
    const [ethBalance, setEthBalance] = useState<number>(0);
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        if (window.ethereum) {
            const newWeb3 = new Web3(window.ethereum);
            setWeb3(newWeb3);
        } else {
            alert('Пожалуйста, установите MetaMask');
        }
    }, []);

    useEffect(() => {
        if (account && web3) {
            fetchBalances();
        }
    }, [account, web3]);

    const fetchBalances = async () => {
        if (!web3 || !account) return;

        try {
            // Получение ETH баланса
            const ethBalance = await web3.eth.getBalance(account);
            setEthBalance(parseFloat(web3.utils.fromWei(ethBalance, 'ether')));

            // Получение балансов токенов ERC20 запилить
            const tokens = [
                { name: "GERDA", address: "0xYourGERDATokenAddress" },
                { name: "KRENDEL", address: "0xYourKRENDELTokenAddress" },
                { name: "RTK", address: "0xYourRTKTokenAddress" },
                { name: "LP", address: "0xYourLPTokenAddress" },
            ];

            const tokenBalances: { [key: string]: number } = {};

            for (const token of tokens) {
                tokenBalances[token.name] = await getTokenBalance(token.address, account);
            }

            setBalances(tokenBalances);
        } catch (err) {
            setError('Проблемы с подключением к интернету'); 
            console.error(err); 
        }
    };

    const getTokenBalance = async (tokenAddress: string, account: string): Promise<number> => {
        if (!web3) return 0;

        try {
            const abi = [
                {
                    "constant": true,
                    "inputs": [{ "name": "owner", "type": "address" }],
                    "name": "balanceOf",
                    "outputs": [{ "name": "", "type": "uint256" }],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ];

            const contract = new web3.eth.Contract(abi, tokenAddress);
            const balance: string = await contract.methods.balanceOf(account).call() as string; 
            return parseFloat(web3.utils.fromWei(balance, 'ether'));
        } catch (err) {
            setError('Проблемы с подключением к интернету');
            console.error(err); 
            return 0;
        }
    };

    return (
        <div className="cabinet-container">
            <h2>Личный кабинет</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>} 

            {account ? (
                <div>
                    <h3>Адрес аккаунта: {account}</h3>
                    <h3>Баланс:</h3>
                    <p>ETH: {ethBalance.toFixed(4)}</p>
                    {Object.entries(balances).map(([token, balance]) => (
                        <p key={token}>
                            {token}: {balance.toFixed(4)}
                        </p>
                    ))}
                </div>
            ) : (
                <p>Адрес аккаунта не найден. Пожалуйста, подключите кошелек.</p> 
            )}
        </div>
    );
};

export default Cabinet;
