// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Factory.sol";
import "./Pool.sol";
import "./ERC20.sol";

contract Router { //контракт для общения между пулами ликвидности
    Token gerda;  //1 валюта
    Token krendel; //2 валюта
    Token rtk; //3 валюта

    Pool GERDA_KRENDEL; //1 тип пула
    Pool KRENDEL_RTK; //2 тип пула

    address poolGK; //адресс пула Gerda-Krendel
    address poolKR; //адресс пула Krender-Rtk

    constructor(
        address _gerda, //адресс смарт-контракта токена Gerda
        address _krendel,//адресс смарт-контракта токена Krendel
        address _rtk,//адресс смарт-контракта токена Rtk
        address _poolGERDA_KRENDEL, //адресс пула ликвидности GERDA-KRENDEL
        address _poolKRENDEL_RTK //адресс пула ликвидности KRENDEL-RTK
    ) {//присвоение значений переменным контракта взависимости от условий конструктора
        gerda = Token(_gerda); 
        krendel = Token(_krendel); 
        rtk = Token(_rtk);
        GERDA_KRENDEL = Pool(_poolGERDA_KRENDEL);
        KRENDEL_RTK = Pool(_poolKRENDEL_RTK); 

        poolGK = _poolGERDA_KRENDEL;
        poolKR = _poolKRENDEL_RTK;
    }

    modifier not_null_value(uint amount) { //проверка что значение не меньше 0
        require(amount > 0, "invalid amount");
        _;
    }

    modifier not_null_address(address _address) {
        require(_address != address(0), "invalid address");
        _;
    }

    function swapGERDAtoRTK(uint amount) public not_null_value(amount) { //обмен валюты GERDA на RTK
        //прежде чем переводить токены, нужно произвести расчёт (вычисление соотношения)
        uint one = amount * gerda.PRICE() * gerda.balanceOf(poolGK);
        uint two = krendel.PRICE() * krendel.balanceOf(poolGK);
        uint tokens = one / two; //соотношение

        
        uint one1 = tokens * krendel.PRICE() * krendel.balanceOf(poolKR);
        uint two1 = rtk.PRICE() * rtk.balanceOf(poolKR);
        uint tokens1 = one1 / two1;

        //проверяем полученное кол-во
        require(tokens1 > 0, "not enough tokens for transfer");

        GERDA_KRENDEL.swap_token(amount, gerda, krendel);
        KRENDEL_RTK.swap_token(amount, krendel, rtk);
    }

    // function swap_token_route( // функция для маршрутизации покупаемых токенов
    //     uint amount,
    //     Token sended_token,
    //     Token received_token) public not_null_value(amount) { 
        
    //     if (sended_token == gerda) {

    //     }
    // }

    function get_balance() public view returns(uint,uint,uint,uint) {
        return (
            gerda.balanceOf(msg.sender), //баланс пользователя в gerda
            krendel.balanceOf(msg.sender), //баланс пользователя в krendel
            rtk.balanceOf(msg.sender), //баланс пользователя в RTK
            msg.sender.balance //баланс пользователя в ETH
            );
    }
}
