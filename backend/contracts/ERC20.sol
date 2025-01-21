// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol"; //стандарт токена ERC20

contract Token is ERC20 { //контракт образ для валюты

    address private Owner; //владелец контракта токена
    uint public PRICE; //цена токена ETH 
    uint8 _decimals; //колво нулей после , важно- именно даная переменная используется во всех вычислениях тк в ERC20 стандарте по умолчанию 18;

    constructor(// создание персонального токена
        string memory _name, //имя токена
        string memory _symbol, //символ токена
        uint totalSupply, //общая капитализация токена
        uint8 decimals,
        uint price, //этот параметр передаетя так: если стоимость 1 eth -> 10; 1.5 eth -> 15; 3 eth -> 30; 6 eth -> 60
        address owner //владелец
    ) ERC20(_name, _symbol) { //токен наследует стандарт ERC20
        _mint(address(this), totalSupply * 10** decimals); //выпуск монет на адресс контракта токена в указанном условии капитале
        _decimals = decimals; 
        PRICE = price *1e17; //цена токена в ETH
        Owner = owner; //владелец смарт контракта токена
    }

    modifier not_null(address _address) { //проверка существует ли адресс отправителя
        require(_address != address(0), "invalid address");
        _;
    }

    modifier only_owner(address _address) { //проверка для функций где взаимодействовать с ней может только владелец смарт контракта 
        require(_address == Owner, "you are not Owner");
        _;
    }

    function transfer_from(address from, address to, uint amount) public not_null(from) not_null(to) returns(bool status) { // перевод средств на другой адресс
        require(amount > 0, "invalid amount"); //нельзя отправить 0 денежных средств
        _transfer(from, to, amount); //перевод
        return status;
    }

      function buy_token() public payable not_null(msg.sender) { //фукнция покупки токена
        require(msg.value >= 10 ** (18 - _decimals), "Minimum purchase amount not met"); //отправляемая пользователем денюжка должна быть не меньше нуля
        uint tokens_to_buy = (msg.value * 10 ** _decimals) / PRICE; //формула вычисляющая колво токенов к покупке -> отправляемая пользователем денюжка * 10 **12
        require(balanceOf(address(this)) >= tokens_to_buy, "Not enough tokens in the contract"); //проверка есть ли на адрессе контракта токена достаточное колво для отправки пользователю
        uint excess_eth = msg.value % (PRICE / 10 ** _decimals); //расчет лишнего эфира
        if (excess_eth > 0) {payable(msg.sender).transfer(excess_eth);} //если лишний эфир есть отправляем обратно пользователю
        _transfer(address(this), msg.sender, tokens_to_buy); //перевод токенов покупателю
    }


    function Mint(address sender, address user, uint amount) public only_owner(sender) {
        _mint(user, amount);
    }
}