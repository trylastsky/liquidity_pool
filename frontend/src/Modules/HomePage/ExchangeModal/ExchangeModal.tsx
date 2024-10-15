import React, { useState, useEffect } from 'react';
import './ExchangeModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

interface ExchangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (fromToken: string, toToken: string, amount: number) => void;
    availableTokens: string[];
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({ isOpen, onClose, onConfirm, availableTokens }) => {
    
    const [fromToken, setFromToken] = useState<string>(availableTokens[0]);
    const [toToken, setToToken] = useState<string>(availableTokens[1]);
    const [amount, setAmount] = useState<number>(0);
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [exchangeRate, setExchangeRate] = useState<number>(1); // Коэффициент

    useEffect(() => {
        // Здесь будет логика получения коэффициента с бэкенда
        // Для примера, установить статические коэффициенты
        const fetchExchangeRate = async () => {
            // Заглушка, заменить на реальный запрос к API
            const rate = fromToken === 'GERDA' && toToken === 'KRENDEL' ? 0.01 :
                         fromToken === 'KRENDEL' && toToken === 'GERDA' ? 100 :
                         1; // Для других пар токенов
        
            setExchangeRate(rate);
            // Также сбрасываем результат, чтобы избежать некорректного отображения
            setResult(null);
        };

        fetchExchangeRate();
    }, [fromToken, toToken]);

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
            calculateResult(amountValue);
        }
    };

    const calculateResult = (amount: number) => {
        if (fromToken !== toToken) {
            setResult(amount * exchangeRate);
        } else {
            setResult(amount);
        }
    };

    const handleConfirm = () => {
        if (amount <= 0) {
            setError("Пожалуйста, введите корректное число.");
            return;
        }
        onConfirm(fromToken, toToken, amount);
        onClose();
    };

    const handleSwapTokens = () => {
        setFromToken(toToken);
        setToToken(fromToken);
        // Сбрасываем количество и результат при обмене
        setAmount(0);
        setResult(null);
    };

    return (
        isOpen ? (
            <div className="modalOverlay">
                <div className="modalContent">
                    <h2>Обмен токенов</h2>
                    {result == null && (<>
                        <p>Введите число для обмена <strong>{fromToken}</strong> на <strong>{toToken}</strong></p>
                    </>)}
                    {amount > 0 && result !== null && (
                        <p><strong>{amount} {fromToken}</strong> на <strong>{result.toFixed(2)} {toToken}</strong></p>

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
                        onClick={handleSwapTokens}
                        title="Поменять"
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} />
                    </button>
                    <div className="modalButtons">
                        <button onClick={handleConfirm}>Подтвердить</button>
                        <button onClick={onClose}>Отмена</button>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default ExchangeModal;
