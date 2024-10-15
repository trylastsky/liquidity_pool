import React, { useState } from 'react';
import './HomePage.css'; 
import ExchangeModal from './ExchangeModal/ExchangeModal';

const pools = [
    {
        id: 1,
        name: 'GERDA-KRENDEL',
        description: 'Обмен между GERDA и KRENDEL. Вы можете обменивать ваши токены по курсу 1:1.',
        rate: '1 GERDA = 1 KRENDEL',
        priceFrom: '30 ETH (GERDA)',
        priceTo: '30 ETH (KRENDEL)',
        tokens: ['GERDA', 'KRENDEL'] // Доступные токены для обмена
    },
    {
        id: 2,
        name: 'KRENDEL-RTK',
        description: 'Обмен между KRENDEL и RTK. Вы можете обменивать токены по курсу 1:1.',
        rate: '1 KRENDEL = 1 RTK',
        priceFrom: '50 ETH (KRENDEL)',
        priceTo: '50 ETH (RTK)',
        tokens: ['KRENDEL', 'RTK'] // Доступные токены для обмена
    },
    {
        id: 3,
        name: 'LP-RTK',
        description: 'Обмен между LP и RTK. Вы можете обменивать токены по курсу 1:1.',
        rate: '1 LP = 1 RTK',
        priceFrom: '40 ETH (LP)',
        priceTo: '40 ETH (RTK)',
        tokens: ['LP', 'RTK'] // Доступные токены для обмена
    }
];

const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPool, setSelectedPool] = useState<any>(null); // Состояние для хранение выбранного пула

    const handleOpenModal = (pool: any) => {
        setSelectedPool(pool);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPool(null);
    };

    const handleConfirmExchange = (fromToken: string, toToken: string, amount: number) => {
        // добавить api обмена
        console.log(`Обмен ${amount} ${fromToken} на ${toToken}`);
    };

    return (
        <div className='container'>
            <h1>Ликвидные пулы</h1>
            <p>Добро пожаловать на страницу наших ликвидных пулов! Здесь вы можете обменивать токены ERC20.</p>
            <div className='pools'>
                {pools.map(pool => (
                    <div key={pool.id} className='poolCard'>
                        <h2>{pool.name}</h2>
                        <p>{pool.description}</p>
                        <p><strong>Курс:</strong> {pool.rate}</p>
                        <p><strong>Цена:</strong> {pool.priceFrom} к {pool.priceTo}</p>
                        <button className='exchangeButton' onClick={() => handleOpenModal(pool)}>Обменять</button>
                    </div>
                ))}
            </div>
            {selectedPool && (
                <ExchangeModal 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onConfirm={handleConfirmExchange} 
                    availableTokens={selectedPool.tokens} // доступные токены кидаються в модальное окно
                />
            )}
        </div>
    );
};

export default HomePage;
