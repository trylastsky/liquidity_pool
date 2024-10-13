// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LiquidityPool.sol";

contract LiquidityPoolFactory is Ownable(address(msg.sender)) {
    LiquidityPool[] public liquidityPools;

    event LiquidityPoolCreated(address indexed pool, address tokenA, address tokenB);

    // Функция для создания нового пула ликвидности
    function createLiquidityPool(address _tokenA, address _tokenB) external onlyOwner returns (address) {
        require(_tokenA != address(0) && _tokenB != address(0), "Invalid token address");
        require(_tokenA != _tokenB, "Tokens must be different");

        // Передаем msg.sender в качестве адреса владельца
        LiquidityPool newPool = new LiquidityPool(_tokenA, _tokenB, msg.sender);
        liquidityPools.push(newPool);

        emit LiquidityPoolCreated(address(newPool), _tokenA, _tokenB);

        return address(newPool);
    }

    //получить все ликвидные пулы
    function getAllLiquidityPools() external view returns (LiquidityPool[] memory) {
        return liquidityPools;
    }

    //Получить адрес пула по индексу
    function getLiquidityPool(uint256 index) external view returns (LiquidityPool) {
        require(index < liquidityPools.length, "Index out of bounds");
        return liquidityPools[index];
    }

    //Получить колво ликвидных пулов
    function getLiquidityPoolCount() external view returns (uint256) {
        return liquidityPools.length;
    }
}
