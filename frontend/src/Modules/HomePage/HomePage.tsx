/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ExchangeModal from './ExchangeModal/ExchangeModal';
import { liquidity_pool } from '../../global'; //pool interface
import { ethers, toNumber } from 'ethers';
import add_liquidity from '../../services/pool/add_liquidity';
import './HomePage.css'; 


interface home_page_interface {
    signer:any;
    pools_contracts: any[] | null; //массив контрактов пулов
    provider: ethers.Provider | null;
    FACTORY: ethers.Contract | null;
    PROFI: ethers.Contract | null
}

const HomePage: React.FC<home_page_interface> = ({signer, pools_contracts, provider, FACTORY, PROFI}) => {
    const [pools, set_pools] = useState<liquidity_pool[] | null | undefined>(null);
    const [ETH_riot, set_ETH_riot] = useState<string>("Loading../");
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

    // const get_eth_riot = async (token) => {

    // }

    const get_pools = async () => {
        if(pools_contracts) {
            const new_pools = await Promise.all(
                pools_contracts.map(async (pool_contract, index) => {
                    const pool = {} as liquidity_pool; // Создаем объект для пула
                    const _pool_info = await pool_contract.getInfo(); // Получение информации о пуле
    
                    // Присваиваем значения объекту pool
                    pool.id = index; // или pool_contract.index, если он доступен
                    pool.address_pool = _pool_info[0];
                    pool.type = _pool_info[1];
                    pool.owner_pool_address = _pool_info[2];
                    pool.owner_pool_name = await FACTORY?.user_name(_pool_info[2]);
                    pool.token1_address = _pool_info[3];
                    pool.token2_address = _pool_info[4];
                    pool.token1_reserve = _pool_info[5];
                    pool.token2_reserve = _pool_info[6];

                    return pool; // Возвращаем объект pool
            }
        )
    );
            set_pools(new_pools);
        }
    };


    

    useEffect(() => {
        get_pools();
    },[pools_contracts])

    return (
        <div className='container'>
            <h1>Ликвидные пулы</h1>
            <p style={{paddingBottom:"25px"}}>Добро пожаловать на страницу наших ликвидных пулов! Здесь вы можете обменивать токены ERC20.</p>
            <div className='pools'>
                {pools ? pools.map(pool => (
                    <div key={pool.id} className='poolCard'>
                        <h2>{pool.type}</h2>
                        <p>{pool.type}</p>
                        <p><strong>Соотношение ETH:</strong> {ETH_riot}</p>
                        <p><strong>Соотношение Токенов:</strong> {toNumber(pool.token1_reserve) / 10 **12 + pool.type.split("-")[0] + " на "
                         + toNumber(pool.token2_reserve) / 10**12 + pool.type.split("-")[1]}</p>
                         <p><strong>Владелец {pool.owner_pool_name}</strong></p>
                        <button className='exchangeButton' onClick={() => handleOpenModal(pool)}>Обменять</button>
                        <button style={{marginLeft: 20}} className='exchangeButton' onClick={() => add_liquidity(signer,pools_contracts?.[pool.id],pool.token1_address)}>Добавить {pool.type.split("-")[0]}</button>
                        <button style={{marginLeft:20}} className='exchangeButton' onClick={() => add_liquidity(signer,pools_contracts?.[pool.id], pool.token2_address)}>Добавить {pool.type.split("-")[1]}</button>
                    </div>
                )) : (<>
                <p style={{color:"red"}}>На данный момент в системе нет пулов ликвидности</p>
                </>)}
            </div>
            {selectedPool && (
                <ExchangeModal 
                    signer={signer}
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onConfirm={handleConfirmExchange} 
                    pool_info = {selectedPool}
                    pool_contract = {pools_contracts?.[selectedPool.id]}
                />
            )}
        </div>
    );
};

export default HomePage;
