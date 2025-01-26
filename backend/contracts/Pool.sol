// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ERC20.sol";

contract Pool {
    Token public token1; //переменная первого токена
    Token public token2; //переменная второго токена

    Token PROFI; //переменная смарт контракта LP

    address public owner; //владелец пула


    struct Info { //структура информации о пуле
        address this_pool; //адресс пула ликвидности
        string this_pool_type; //имя данного пула
        address owner; //адресс владельца контракта
        Token token1; //обьект первого токена
        Token token2; //обьект второго токена 
        uint token1_reserve;//колво оставшихся токенов в пуле (токен1)
        uint token2_reserve;//колво оставшихся токенов в пуле (токен2)
    }


    constructor(
        address _token1, //адресс смарт контракта с первым токеном в пуле
        uint _amount1, //стартовое кол-во первого токена в пуле
        address _token2,//адресс смарт контракта второго токена в пуле
        uint _amount2, //стартовое кол-во второго токена в пуле
        address profi_address,//адресс смарт контракта с первым токеном в пуле
        address _owner //адресс владельца пула (значение есть потому что создается 2 пула через deploy.js)
    ) {
        token1 = Token(_token1); //назначение переменной первого токена
        token2 = Token(_token2);//назначение переменной второго токена
        PROFI = Token(profi_address); //назначение переменной LP токена (PROFI)
        owner = _owner; //назначение переменной владельца

        token1.transferFrom(_token1, address(this), _amount1); //перевод всей суммы токена 1 на баланс пула
        token2.transferFrom(_token2, address(this), _amount2); //перевод всей суммы токена 2 на баланс пула
    }

   
    function swap_token( //функция обмена одного токена на второй
        uint _amount, //количество обмениваемых токенов 1 gerda = 1 * 1e12;
        Token sended_token, //отправляемый пользователем токен
        Token received_token //получаемый пользователем токен
    ) public {
    require(_amount > 0, "you need send min 1 or more tokens"); // проверка что токены которые мы пытаемся обменять не меньше 0
    // Получаем текущие балансы токенов в пуле
    uint balanceSended = sended_token.balanceOf(address(this)); //баланс принимаемого токена пулом
    uint balanceReceived = received_token.balanceOf(address(this)); //баланс получаемого токена пулом
    // Расчет текущего соотношения
    uint tokens = (balanceReceived * _amount) / balanceSended; // Получаем количество получаемых токенов
    
    require(balanceReceived >= tokens, "Not enough tokens available in the pool"); //проверка может ли пул начислить вам столько токенов
    // Обмениваем токены
    sended_token.transferFrom(msg.sender, address(this), _amount);
    received_token.transferFrom(address(this), msg.sender, tokens);
}

    function add_liquidity(uint _amount, Token token) public { //функция добавления токена в пул
        require(_amount > 0, "You need send min 1 or more tokens"); //внести можно не меньше 1 токена
        uint amount_profi = _amount * token.PRICE() / PROFI.PRICE(); //вычисляем сколько Profi получит пользователь за добавление активов в пул
        token.transferFrom(msg.sender, address(this), _amount); //переводим токены от пользователя на счет пула
        PROFI.Mint(owner, msg.sender, amount_profi); //выпускаем токены LP в расчете из amount_profi
    }

    function getInfo() public view returns (Info memory) {
        return Info(
            address(this), //адресс текущего пула
            string.concat(token1.symbol(),"-",token2.symbol()), //string.concat- обьединение строк, в итоге здесь получаем имя пула
            owner, //владелец пула
            token1, //обьетк токена 1
            token2, //обьект токена 2 
            token1.balanceOf(address(this)), //баланс - остаток токена в данном пуле
            token2.balanceOf(address(this)) //баланс - остаток токена2 в данном пуле
        );
    }
}