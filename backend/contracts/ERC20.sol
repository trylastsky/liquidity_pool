// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; //стандарт токена ERC20

contract Coin is ERC20 { //контракт образ для валюты

    address private Owner; //владелец контракта

    uint public PRICE; //цена токена ETH
    uint8 _decimals;

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    constructor(// создание персонального токена
        string memory _name, //имя токена
        string memory _symbol, //символ токена
        uint _totalSypply, //общая капитализация токена
        uint8 _desimas,
        uint price, //этот параметр передаетя так: если стоимость 1 eth -> 10; 1.5 eth -> 15; 3 eth -> 30; 6 eth -> 60
        address owner //владелец
    ) ERC20(_name, _symbol) { //токен наследует стандарт ERC20
        _mint(address(this), _totalSypply * 10**_desimas); //выпуск монет на адресс контракта токена в указанном условии капитале
        _decimals = _desimas; 
        PRICE = price *1e17; //цена токена в ETH
        Owner = owner; //владелец смарт контракта токена
    }

    modifier NotNull(address add) { //проверка существует ли адресс отправителя
        require(add != address(0), "invalid address");
        _;
    }

    modifier OnlyOwner(address add) { //проверка для функций где взаимодействовать с ней может только владелец смарт контракта 
        require(add == Owner, "you are not Owner");
        _;
    }

    function transferFrom(address from, address to, uint amount) virtual override public NotNull(from) NotNull(to) returns(bool) { // перевод средств на другой адресс
        require(amount > 0, "invalid amount"); //нельзя отправить 0 денежных средств
        _transfer(from, to, amount); //перевод
    }

    //в интерфейсе нужно делить чисто на 10**12
    //написала для себя, в качестве эксперимента
    function BuyCoinFromAmountEther(address user) public payable NotNull(user) {
        require(msg.value >= 10**(18 - _decimals), "invalid money");
        uint ost = msg.value % 10**(18 - _decimals); //например, если у токена _decimals = 12, то 6 последних нулей в любом случае излишек и мы возращаем его назад
        uint amountToken = (msg.value - ost) / (PRICE / 10**_decimals); //количество токена
        uint ost2 = (msg.value - ost) % (PRICE / 10**_decimals);  //лишние средства, которых не хватило для покупки ещё одного токена
        payable(user).transfer(ost + ost2);
        transferFrom(address(this), user, amountToken);
    }

    //на фронте функция принимает количество токена с учётом десятичной части
    //если _decimals = 12, то 1 = 0,000000000001 токена, а 1000000000000 = 1 токену
    function BuyTokenFromAmountToken(address user, uint amount) public payable NotNull(user) {
        require(amount > 0, "invalid amount");
        require(msg.value == amount * PRICE / 10**_decimals, "invalid money");
        transferFrom(address(this), user, amount);
    }

    function etherBalanceContract() public view returns(uint) {
        return address(this).balance;
    }

    function Mint(address sender, address user, uint amount) public OnlyOwner(sender) {
        _mint(user, amount);
    }

    function Burn(address sender, address user, uint amount) public OnlyOwner(sender) {
        _burn(user, amount);
    }
}