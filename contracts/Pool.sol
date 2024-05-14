// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

import "./ERC20.sol";

contract Pool {
    uint pollsAmount = 0; // количество пулов в системе изначально
    //назначение токенов внутри pool
    GerdaCoin public gerdaCoin; 
    KrendelCoin public krendelCoin;
    RTKCoin public rtkCoin;

    struct Gerda_Krendel_pool { // структура пула Gerda -> Krendel
        uint GerdaAmount; //количество GerdaCoin в пуле
        uint KrendelAmount; //количество KrendelCoin в пуле
        address owner; //владелец пула 
    }

    struct Krendel_RTK_pool { // структура пула Krendel -> RTK
        uint KrendelAmount; //количество Krendel в пуле
        uint RTKAmount; //количество RTKAmount в пуле
        address owner; //владелец пула
    }
    //получить пулы по айди 
    mapping(uint => Gerda_Krendel_pool) gerda_krendel_pool_byId; 
    mapping(uint => Krendel_RTK_pool) krendel_RTK_pool_byId;

    mapping(address => uint256) public stakingBalanceGerda; //вложения пользователя в GerdaCoin
    mapping(address => uint256) public stakingBalanceKrendel; //вложения пользователя в KrendelCoin
    mapping(address => uint256) public stakingBalanceRTK; //вложения пользователя в RTKCoin

    constructor(
                address _gerdaCoinAddress,
                address _krendelCoinAddress, 
                address _rtkCoinAddress) {
        //внедрение интерфейсов токенов
        gerdaCoin = GerdaCoin(_gerdaCoinAddress);
        krendelCoin = KrendelCoin(_krendelCoinAddress);
        rtkCoin = RTKCoin(_rtkCoinAddress);
        
    } 
                       

    function add_Gerda_Krendel_pool(uint _startedGerdaAmount, uint _startedKrendelAmount) public {
        require(gerdaCoin.balanceGerdaCoin(msg.sender) == _startedGerdaAmount &&
                krendelCoin.balanceKrendelCoin(msg.sender) == _startedKrendelAmount,"insufficient funds to create a pool");
        gerda_krendel_pool_byId[pollsAmount] = Gerda_Krendel_pool(_startedGerdaAmount, _startedKrendelAmount,msg.sender);
        pollsAmount++;
    }
}