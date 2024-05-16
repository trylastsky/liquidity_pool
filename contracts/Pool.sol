// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

import "./ERC20.sol";


contract Pool {
    //назначение токенов внутри pool
    GerdaCoin public gerdaCoin; //gerda token
    KrendelCoin public krendelCoin; // krendel token
    RTKCoin public rtkCoin; //RTK token
    Professional public PROFI;// LP token

    address public owner; // владелец пула

    mapping (address => uint) public value_donated_token1; // мапинги для стэйкинга
    mapping (address => uint) public value_donated_token2; // количество пожертвованных токенов пользователем

    constructor(
                address _gerdaCoinAddress,
                address _krendelCoinAddress, 
                address _rtkCoinAddress,
                address _owner) {
        //внедрение интерфейсов токенов
        gerdaCoin = GerdaCoin(_gerdaCoinAddress);
        krendelCoin = KrendelCoin(_krendelCoinAddress);
        rtkCoin = RTKCoin(_rtkCoinAddress);
        owner = _owner;
    } 

}


contract Gerda_Krendel is Pool {
    constructor(
                address _gerdaCoinAddress,
                address _krendelCoinAddress, 
                address _rtkCoinAddress,
                address _owner) Pool(
                    _gerdaCoinAddress,
                    _krendelCoinAddress, 
                    _rtkCoinAddress,
                    _owner) {
                }

    function add_gerda_for_pool(uint _amount_gerda) internal {// функция добавляющая gerda в pool
        if (msg.sender == owner) {//если пользователь создатель пула, то бонусы ему не начисляться
            gerdaCoin.transferGerdaCoin(msg.sender, address(this), _amount_gerda);
        }
        else { //иначе начислим бонусы вложившему в пул
            gerdaCoin.transferGerdaCoin(msg.sender, address(this), _amount_gerda);
            value_donated_token1[msg.sender] += _amount_gerda;
        }
    }

    function add_krendel_for_pool(uint _amount_krendel) internal { //функция добавляющая krendel в pool 
        if (msg.sender == owner) {//если пользователь создатель пула, то бонусы ему не начисляться
                krendelCoin.transferKrendelCoin(msg.sender, address(this), _amount_krendel);
            }
            else { //иначе начислим бонусы вложившему в пул
                krendelCoin.transferKrendelCoin(msg.sender, address(this), _amount_krendel);
                value_donated_token2[msg.sender] += _amount_krendel;
            }
    }

    function extend_for_gerda(uint _amount_krendel_to_extend) public {//фукнция обмена gerda на krendel
        // расчитать код соотношения и написать полноценую функцию обмена
    }

    function extend_for_krendel(uint _amount_gerda_to_extend) public { //функция обмена krendel на gerda
        // расчитать код соотношения и написать полноценую функцию обмена
    }

    function view_balance_pool(address _adr) public view returns(uint gerda_bal,uint krendel_bal) {
        gerda_bal = gerdaCoin.balanceGerdaCoin(_adr);
        krendel_bal = krendelCoin.balanceKrendelCoin(_adr);
    }
     
}


contract Krendel_RTK is Pool {
    constructor(
                address _gerdaCoinAddress,
                address _krendelCoinAddress, 
                address _rtkCoinAddress,
                address _owner) Pool(
                    _gerdaCoinAddress,
                    _krendelCoinAddress, 
                    _rtkCoinAddress,
                    _owner) {
                }        

        struct Krendel_RTK_pool { // структура пула Krendel -> RTK
        uint KrendelAmount; //количество Krendel в пуле
        uint RTKAmount; //количество RTKAmount в пуле
        address owner; //владелец пула
    }             

    function add_krendel_for_pool(uint _amount_krendel) internal {// функция добавляющая krendel в pool
        if (msg.sender == owner) {//если пользователь создатель пула, то бонусы ему не начисляться
            krendelCoin.transferKrendelCoin(msg.sender, address(this), _amount_krendel);
        }
        else { //иначе начислим бонусы вложившему в пул
            krendelCoin.transferKrendelCoin(msg.sender, address(this), _amount_krendel);
            value_donated_token1[msg.sender] += _amount_krendel;
        }
    }

    function add_rtk_for_pool(uint _amount_rtk) internal { //функция добавляющая RTK в pool 
        if (msg.sender == owner) {//если пользователь создатель пула, то бонусы ему не начисляться
                rtkCoin.transferRTKCoin(msg.sender, address(this), _amount_rtk);
            }
            else { //иначе начислим бонусы вложившему в пул
                rtkCoin.transferRTKCoin(msg.sender, address(this), _amount_rtk);
                value_donated_token2[msg.sender] += _amount_rtk;
            }
    }

    function extend_for_rtk(uint _amount_krendel_to_extend) public {//фукнция обмена krendel на rtk
        // расчитать код соотношения и написать полноценую функцию обмена
    }

    function extend_for_krendel(uint _amount_rtk_to_extend) public { //функция обмена rtk на krendel
        // расчитать код соотношения и написать полноценую функцию обмена
    }

    function view_balance_pool(address _adr) public view returns(uint gerda_bal,uint krendel_bal) {
        gerda_bal = gerdaCoin.balanceGerdaCoin(_adr);
        krendel_bal = krendelCoin.balanceKrendelCoin(_adr);
    }
}
