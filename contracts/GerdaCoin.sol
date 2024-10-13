// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GerdaCoin is ERC20 { //токен GERDA
    constructor(uint256 initialSupply) ERC20("GerdaCoin", "GERDA") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
