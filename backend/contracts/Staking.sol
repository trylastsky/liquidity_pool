// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ERC20.sol";

contract Staking {

    Token public PROFI; //токен LP 
    address private Owner; //

    struct Info { //структура информации о стейкинге пользователя
        uint count_LP; //колво LP на стейкинге
        uint last_reward_time; //последнее время вознаграждения
    }

    uint REWARD_SECOND = 13;

    mapping (address => Info) public user_stake_info; //мапинг где мы храним информацию о стейкинге пользователя


    constructor(
        address profi,//адресс Profi смарта
        address owner// адресс владельца PROFI смарта
    ) {
        PROFI = Token(profi); //адресс Profi смарта
        Owner = owner;// адресс владельца PROFI смарта
    }


    function set_stake(uint amount) public {  //создать или обновить stake
        require(PROFI.balanceOf(msg.sender) >= amount, "invalid token"); //проверка есть ли у пользователя токены LP

        Info storage info = user_stake_info[msg.sender]; //приведение типов из значения user_stake_info

        info.count_LP += amount; //колво LP на счету = кол-ву внесенных LP на стейкинг
        PROFI.transferFrom(msg.sender, address(this), amount); //перевод LP токенов от пользователя на стейкинг счет
    }

    function get_RW() public { //получить вознаграждение
        require(user_stake_info[msg.sender].count_LP > 0, "not stake"); //проверка достаточно ли токенов LP у пользователя на балансе стейкинга
        require(PROFI.balanceOf(address(this)) > 0, "contract balance is zero"); //проверка сколько токенов LP находится на контракте стейкинга сейчас

        Info storage info = user_stake_info[msg.sender]; //приведение типов user_stake_info
        //формула получения вознаграждения из ТЗ
        uint one = block.timestamp - info.last_reward_time;
        uint two = (info.count_LP / PROFI.balanceOf(address(this))) / 1e12;

        uint two_in_tree = ((one / (30 days)) * 5e4 * 1e12) / 1e12;

        uint reward = (info.count_LP / 1e12) * one * REWARD_SECOND * two * two_in_tree; // финальная сумма которую получит user

        info.last_reward_time = block.timestamp;
        PROFI.mint(msg.sender,reward); //выпускаем монеты и отдаем их как награду пользователю
    }
}