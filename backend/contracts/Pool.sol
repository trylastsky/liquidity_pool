// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ERC20.sol";

contract Pool {
    Coin public token1;
    Coin public token2;

    Coin PROFI;

    address public Owner;

    constructor(
        address _token1, 
        uint _amount1, 
        address _token2,
        uint _amount2, 
        address profi,
        address owner
    ) {
        token1 = Coin(_token1);
        token2 = Coin(_token2);
        PROFI = Coin(profi);
        Owner = owner;

        token1.transferFrom(_token1, address(this), _amount1);
        token2.transferFrom(_token2, address(this), _amount2);
    }

    //пользоваетль вводит токен, который хочет отдать в замен на другой
    function swap(address sender, uint _amount, bool isOne) public {
        require(_amount > 0, "invalid amount token");

        if(isOne) {
            require(token1.balanceOf(address(this)) >= _amount, "the pool are not enough token this amount");
            require(token1.balanceOf(sender) >= _amount, "invalid money");

            uint one = _amount * token1.PRICE() * token2.balanceOf(address(this));
            uint two = token2.PRICE() * token1.balanceOf(address(this));

            uint tokens = one / two;

            token1.transferFrom(sender, address(this), _amount);
            token2.transferFrom(address(this), sender, tokens);
        } else {
            require(token2.balanceOf(address(this)) >= _amount, "the pool are not enough token this amount");
            require(token2.balanceOf(sender) >= _amount, "invalid money");
            uint one = _amount * token2.PRICE() * token1.balanceOf(address(this));
            uint two = token1.PRICE() * token2.balanceOf(address(this));

            uint tokens = one / two;

            token2.transferFrom(sender, address(this), _amount);
            token1.transferFrom(address(this), sender, tokens);
        }
    }    

    function addLiquidity(uint _amount, bool isOne) public {
        require(_amount > 0, "invalid amount token");

        if(isOne) {
            require(token1.balanceOf(msg.sender) >= _amount, "invalid money");

            uint newProfi = _amount * token1.PRICE() / PROFI.PRICE();

            token1.transferFrom(msg.sender, address(this), _amount);

            PROFI.Mint(Owner, msg.sender, newProfi);
        } else {
            require(token2.balanceOf(msg.sender) >= _amount, "invalid money");

            uint newProfi = _amount * token2.PRICE() / PROFI.PRICE();

            token2.transferFrom(msg.sender, address(this), _amount);

            PROFI.Mint(Owner, msg.sender, newProfi);
        }
    }



    struct Info {
        address ThisPool;
        address Owner;
        string Name1;
        string Name2;
        uint Price;
        uint Reserve1;
        uint Reserve2;
        uint EthReserve1;
        uint EthReserve2;
        address[] UserAddLiquidity;
    }

    function getInfo() public view returns (Info memory) {
        return Info(
            address(this),
            Owner,
            token1.name(),
            token2.name(),
            token1.balanceOf(address(this)) * token1.PRICE() + token2.balanceOf(address(this)) * token2.PRICE(),
            token1.balanceOf(address(this)),
            token2.balanceOf(address(this)),
            token1.balanceOf(address(this)) * token1.PRICE(),
            token2.balanceOf(address(this)) * token2.PRICE(),
            usersAddLiquidity   
        );
    }

    address[] public usersAddLiquidity;
}