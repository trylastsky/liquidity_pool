// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RTKCoin is ERC20 {//токен RTK
    constructor(uint256 initialSupply) ERC20("RTKCoin", "RTK") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
