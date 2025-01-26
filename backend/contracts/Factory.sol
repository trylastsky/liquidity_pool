// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Pool.sol";

contract Factory { //контракт из которого производится деплой всех пулов и хранение информации об них
    Pool[] public  pools; //массив всех пулов

    struct UserPool {
        uint Id;
        Pool userPool;
    }

    struct User {
        string Name;
        UserPool[] Pools;
    }

    mapping (address => User) public user;//маппинг пользователя
    mapping (address => bool) private user_status_registration; //статус регистрации пользователя

    function deploy_pool( //функция деплоя пула
        address token1,  //адресс первого токена
        uint amount1,   //передаётся целое количество токена
        address token2, //адресс второго токена
        uint amount2,   //передаётся целое количество токена
        address profi, //адрис стейкинг смартконтракта
        address owner //адресс владельца пула
    ) public returns (Pool) { //
        Pool new_pool = new Pool( //создание пула по образу смарт контракта Pool
            token1,  //адресс первого токена
            amount1 * 1e12, //передаётся  количество токена
            token2,//адресс второго токена
            amount2 * 1e12, //передаётся  количество токена
            profi,//адрис стейкинг смартконтракта
            owner //адресс владельца пула
        );
        pools.push(new_pool); //добавление обьекта пула в общий массив пулов
        user[owner].Pools.push(UserPool(pools.length, new_pool)); 
        return new_pool;
    }

    function get_pools() public view returns (Pool[] memory) {
        return pools;
    }

    function authorization_user() public view returns(User memory) {
        require(user_status_registration[msg.sender] == true, "this user is not registred");
        return user[msg.sender];
    }

    function registration_user(string memory user_name, address user_address) public {
        require(user_address != address(0), "incorrect address");
        require(user_status_registration[user_address] == false, "user already registred");
        user[user_address].Name = user_name; //обьявление имени
        user_status_registration[user_address] = true; //already registred
    }
}