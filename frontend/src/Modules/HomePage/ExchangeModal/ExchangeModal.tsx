import React, { useState, useEffect } from 'react';
import './ExchangeModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

interface ExchangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (fromToken: string, toToken: string, amount: number) => void;
    pool:any;
    pool_contract:any;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({ isOpen, onClose,pool,pool_contract}) => {
    
    const [amount, setAmount] = useState<number>(0);
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const swap_token = async (
        _amount:number,
        sended_token_address:string,
        received_token_address:string
    ) => {
        const response = await pool_contract.swap_token(_amount, sended_token_address, received_token_address);
        console.log(response);
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '' || isNaN(Number(value)) || Number(value) < 0) {
            setError("Пожалуйста, введите корректное число.");
            setAmount(0);
            setResult(null);
        } else {
            setError(null);
            const amountValue = parseFloat(value);
            setAmount(amountValue);
        }
    };





    return (
        isOpen ? (
            <div className="modalOverlay">
                <div className="modalContent">
                    <h2>Обмен токенов</h2>
                    {result == null && (<>
                        <p>Введите число для обмена <strong>{pool.type.split('-')[0]}</strong> на <strong>{pool.type.split('-')[1]}</strong></p>
                    </>)}
                    {amount > 0 && result !== null && (
                        <p><strong>{amount} {}</strong> на <strong>{result.toFixed(2)} </strong></p>

                    )}
                    <label>
                        Количество:
                        <input type="number" value={amount > 0 ? amount : ''} onChange={handleAmountChange} />
                    </label>
                    {error && (
                        <div className="errorPopup">{error}</div>
                    )}
                    <button 
                        className="swapButton"
                        
                        title="Поменять"
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} />
                    </button>
                    <div className="modalButtons">
                        <button onClick={() => {swap_token(amount, pool.token1_address, pool.token2_address)}}>Подтвердить</button>
                        <button onClick={onClose}>Отмена</button>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default ExchangeModal;
