// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ERC20.sol";

contract Staking {
    Token public PROFI; // токен LP 
    mapping(address => uint) public stakes; // количество LP на стейкинге пользователя
    mapping(address => uint) public lastRewardTime; // последнее время вознаграждения
    uint public totalStaked; // общее количество застейканных LP токенов
    uint constant REWARD_SECOND = 13; // количество PROFI, получаемых за секунду

    constructor(address profi) {
        PROFI = Token(profi);
    }

        function calculateReward(address user) internal view returns (uint) {
        uint stakedAmount = stakes[user];
        uint timeElapsed = block.timestamp - lastRewardTime[user];
        if (stakedAmount == 0 || timeElapsed == 0) {
            return 0;
        }
        uint proportion = (stakedAmount * 1e18) / totalStaked;
        uint percentageIncrease = (timeElapsed * 5e4) / 30 days + 1;
        return (stakedAmount * timeElapsed * REWARD_SECOND * (proportion / 1e18 + 1) * percentageIncrease) / 1e18;
    }

        function claimReward() public {
        uint amount = calculateReward(msg.sender);
        require(amount > 0, "No reward available");
        lastRewardTime[msg.sender] = block.timestamp; // обновляем время последнего вознаграждения
        PROFI.mint(msg.sender, amount);
    }
    

    function stake(uint amount) public {
        require(PROFI.balanceOf(msg.sender) >= amount, "Insufficient tokens");
        totalStaked += amount;
        stakes[msg.sender] += amount;
        PROFI.transferFrom(msg.sender, address(this), amount);
    }


}
