// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ERC20.sol";

contract Staking {

    Coin public PROFI;
    address private OwnerProfi;

    constructor(address profi, address owner) {
        PROFI = Coin(profi);
        OwnerProfi = owner;
    }

    struct Info {
        uint countLP;
        uint lastRewardTime;
        uint rewardPerSecond;
    }
    
    mapping (address => Info) public userStake;


    //создать или обновить stake
    function setStake(uint amount) public {
        require(PROFI.balanceOf(msg.sender) >= amount, "invalid token");

        Info storage info = userStake[msg.sender];

        info.countLP += amount;
        info.rewardPerSecond = 1;
        info.lastRewardTime = block.timestamp;

        PROFI.transferFrom(msg.sender, address(this), amount);
    }

    function getRW() public {
        require(userStake[msg.sender].countLP > 0, "not stake");
        require(PROFI.balanceOf(address(this)) > 0, "contract balance is zero");

        Info storage info = userStake[msg.sender];

        uint one = block.timestamp - info.lastRewardTime;
        uint two = (info.countLP / PROFI.balanceOf(address(this)) + 1e6) / 1e6;

        uint twoInTree = ((one / (30 days)) * 5e4 + 1e6) / 1e6;

        uint rw = (info.countLP / 1e6) * one * info.rewardPerSecond * two * twoInTree;

        info.lastRewardTime = block.timestamp;
        PROFI.Mint(OwnerProfi, msg.sender, rw);
    }
}
