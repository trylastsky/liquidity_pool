// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Pool.sol";

contract Factory { //контракт из которого производится деплой всех пулов и хранение информации об них
    Pool[] public  pools; //массив всех пулов

  

    mapping (address => string) public user_name;//маппинг пользователя
    mapping (address => Pool[]) public user_pools;//пулы пользователя
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
        user_pools[owner].push(new_pool); 
        return new_pool;
    }

    function get_pools() public view returns (Pool[] memory) {
        return pools;
    }

    function authorization_user() public view returns(string memory) {
        require(user_status_registration[msg.sender] == true, "this user is not registred");
        return user_name[msg.sender];
    }

    function registration_user(string memory _user_name, address user_address) public {
        require(user_address != address(0), "incorrect address");
        require(user_status_registration[user_address] == false, "user already registred");
        user_status_registration[user_address] = true; //already registred
        user_name[user_address] = _user_name; //обьявление имени
    }
}