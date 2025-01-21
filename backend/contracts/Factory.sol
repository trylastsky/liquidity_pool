// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Pool.sol";

contract Factory { //контракт из которого производится деплой всех пулов и хранение информации об них
    Pool[] public  pools; //массив всех пулов

     constructor() { //задаем имя пользователя по тз
        user[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].Name = 'Tom';
        user[0x70997970C51812dc3A010C7d01b50e0d17dc79C8].Name = 'Ben';
        user[0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC].Name = 'Rick';
        user[0x90F79bf6EB2c4f870365E785982E1f101E93b906].Name = 'Owner';
    }

    function deploy_pool( //функция деплоя пула
        address token1,  //адресс первого токена
        uint amount1,   //передаётся целое количество токена
        address token2, //адресс второго токена
        uint amount2,   //передаётся целое количество токена
        address profi, //адрис стейкинг смартконтракта
        address owner //адресс владельца пула
    ) public returns (address) { //
        Pool new_pool = new Pool( //создание пула по образу смарт контракта Pool
            token1,  //адресс первого токена
            amount1 * 1e12, //передаётся  количество токена
            token2,//адресс второго токена
            amount2 * 1e12, //передаётся  количество токена
            profi,//адрис стейкинг смартконтракта
            owner //адресс владельца пула
        );
        pools.push(new_pool); //добавление обьекта пула в общий массив пулов
        user[msg.sender].Pools.push(UserPool(pools.length, address(new_pool))); 
        return address(new_pool);
    }

    function getAllAddressPools() public view returns (Pool[] memory) {
        return pools;
    }

    struct UserPool {
        uint Id;
        address Address;
    }

    struct User {
        string Name;
        UserPool[] Pools;
    }

    mapping (address => User) user;

    function auth() public view returns(User memory) {
        return user[msg.sender];
    }
}