// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Factory.sol";
import "./Pool.sol";
import "./ERC20.sol";

contract Router { //контракт для общения между пулами ликвидности
    Coin gerda;  //1 валюта
    Coin krendel; //2 валюта
    Coin rtk; //3 валюта

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
        gerda = Coin(_gerda);
        krendel = Coin(_krendel);
        rtk = Coin(_rtk);
        GERDA_KRENDEL = Pool(_poolGERDA_KRENDEL);
        KRENDEL_RTK = Pool(_poolKRENDEL_RTK);
        poolGK = _poolGERDA_KRENDEL;
        poolKR = _poolKRENDEL_RTK;
    }

    modifier notNull(uint amount) { //проверка что значение не меньше 0
        require(amount > 0, "invalid amount");
        _;
    }

    function swapGERDAtoRTK(uint amount) public notNull(amount) { //обмен валюты GERDA на RTK
        //прежде чем переводить токены, нужно произвести расчёт (вычисление соотношения)
        uint one = amount * gerda.PRICE() * gerda.balanceOf(poolGK);
        uint two = krendel.PRICE() * krendel.balanceOf(poolGK);
        uint tokens = one / two; //соотношение

        
        uint one1 = tokens * krendel.PRICE() * krendel.balanceOf(poolKR);
        uint two1 = rtk.PRICE() * rtk.balanceOf(poolKR);
        uint tokens1 = one1 / two1;

        //проверяем полученное кол-во
        require(tokens1 > 0, "not enough tokens for transfer");

        GERDA_KRENDEL.swap(msg.sender, amount, true);
        KRENDEL_RTK.swap(msg.sender, amount, true);
    }

    function destrybuteTokens() public {
        gerda.transferFrom(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 10000);
        gerda.transferFrom(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 10000);

        krendel.transferFrom(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 10000);
        krendel.transferFrom(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 10000);

        rtk.transferFrom(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 10000);
        rtk.transferFrom(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 10000);
    }

    function getBalance() public view returns(uint,uint,uint,uint) {
        return (gerda.balanceOf(msg.sender), krendel.balanceOf(msg.sender), rtk.balanceOf(msg.sender), msg.sender.balance);
    }

    // function swapGERDAtoKRENDEL(uint amount) public notNull(amount) {
    //     GERDA_KRENDEL.swap(msg.sender, amount, true);
    // }

    // function swapKRENDELtoRTK(uint amount) public notNull(amount) {
    //     KRENDEL_RTK.swap(msg.sender, amount, true);
    // }

    // function swapKRENDELtoGERDA(uint amount) public notNull(amount) {
    //     GERDA_KRENDEL.swap(msg.sender, amount, false);
    // }

    // function swapRTKtoKRENDEL(uint amount) public notNull(amount) {
    //     KRENDEL_RTK.swap(msg.sender, amount, false);
    // }
}