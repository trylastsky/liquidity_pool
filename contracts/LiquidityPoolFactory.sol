// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Указываем версию Solidity, которой будет соответствовать контракт

import "@openzeppelin/contracts/access/Ownable.sol"; // Импортируем контракт Ownable для управления владельцем
import "./LiquidityPool.sol"; // Импортируем контракт LiquidityPool из локального файла

// Определяем новый контракт LiquidityPoolFactory, который наследует функциональность контракта Ownable
contract LiquidityPoolFactory is Ownable {
    LiquidityPool[] public liquidityPools; // Массив, хранящий созданные пулы ликвидности

    // Событие, которое будет срабатывать при создании нового пула
    event LiquidityPoolCreated(address indexed pool, address tokenA, address tokenB);

    // Конструктор контракта, вызывающий конструктор Ownable без аргументов
    constructor() Ownable(msg.sender) {}

    // Функция для создания нового пула ликвидности
    function createLiquidityPool(address _tokenA, address _tokenB) external  returns (address) {
        // Проверяем, что переданные адреса токенов не равны нулю
        require(_tokenA != address(0) && _tokenB != address(0), "Invalid token address");
        // Проверяем, что токены различны
        require(_tokenA != _tokenB, "Tokens must be different");

        // Создаем новый пул ликвидности и передаем msg.sender в качестве владельца
        LiquidityPool newPool = new LiquidityPool(_tokenA, _tokenB, msg.sender);
        // Добавляем созданный пул в массив
        liquidityPools.push(newPool);

        // Запускаем событие создания пула
        emit LiquidityPoolCreated(address(newPool), _tokenA, _tokenB);

        // Возвращаем адрес нового пула
        return address(newPool);
    }

    // Функция для добавления ликвидности в указанный пул по индексу
    function addLiquidityToPool(uint256 index, uint256 amountA, uint256 amountB) external {
        // Проверяем, что индекс не превышает длину массива пулов
        require(index < liquidityPools.length, "Index out of bounds");
        // Получаем пул по индексу
        LiquidityPool pool = liquidityPools[index];

        // Добавляем ликвидность в пул
        pool.addLiquidity(amountA, amountB);
    }

    // Функция для удаления ликвидности из указанного пула
    function removeLiquidityFromPool(uint256 index, uint256 amountA, uint256 amountB) external {
        // Проверяем, что индекс не превышает длину массива пулов
        require(index < liquidityPools.length, "Index out of bounds");
        // Получаем пул по индексу
        LiquidityPool pool = liquidityPools[index];

        // Удаляем ликвидность из пула
        pool.removeLiquidity(amountA, amountB);
    }

    // Функция для обмена токенов в указанном пуле
    function swapInPool(uint256 index, uint256 amountIn, address fromToken) external {
        // Проверяем, что индекс не превышает длину массива пулов
        require(index < liquidityPools.length, "Index out of bounds");
        // Получаем пул по индексу
        LiquidityPool pool = liquidityPools[index];

        // Выполняем обмен в пуле
        pool.swap(amountIn, fromToken);
    }

function getAmountOutInPool(uint256 index, uint256 amountIn) external view returns (uint256) {
    // Проверяем, что индекс не превышает длину массива пулов
    require(index < liquidityPools.length, "Index out of bounds");
    // Получаем пул по индексу
    LiquidityPool pool = liquidityPools[index];

    // Получаем резервы для входящих и выходящих токенов
    (uint256 reserveIn, uint256 reserveOut) = pool.getReserves(); // Теперь это корректный вызов

    // Возвращаем количество токенов, получаемых при обмене
    return pool.getAmountOut(amountIn, reserveIn, reserveOut); // Передаем все три аргумента
}



    // Функция для получения всех ликвидных пулов
    function getAllLiquidityPools() external view returns (LiquidityPool[] memory) {
        // Возвращаем массив всех пулов
        return liquidityPools;
    }

    // Функция для получения адреса пула по индексу
    function getLiquidityPool(uint256 index) external view returns (LiquidityPool) {
        // Проверяем, что индекс не превышает длину массива пулов
        require(index < liquidityPools.length, "Index out of bounds");
        // Возвращаем пул по указанному индексу
        return liquidityPools[index];
    }

    // Функция для получения количества ликвидных пулов
    function getLiquidityPoolCount() external view returns (uint256) {
        // Возвращаем количество пулов
        return liquidityPools.length;
    }
}
