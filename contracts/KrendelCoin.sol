// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KrendelCoin is ERC20 {//токен KRENDEL
    constructor(uint256 initialSupply) ERC20("KrendelCoin", "KRENDEL") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
