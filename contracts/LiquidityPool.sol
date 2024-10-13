// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityPool is Ownable { //
    using SafeMath for uint256; //используем библиотеку для подсчетов

    IERC20 public tokenA;
    IERC20 public tokenB;

    // Хранение резервов
    uint256 public reserveA;
    uint256 public reserveB;
    
    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB);
    event Swapped(address indexed user, address fromToken, address toToken, uint256 amountIn, uint256 amountOut);

    // Теперь мы передаем `msg.sender` в конструктор Ownable
    constructor(address _tokenA, address _tokenB, address _owner) Ownable(_owner) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    // Функция добавления ликвидности
    function addLiquidity(uint256 amountA, uint256 amountB) external {
        require(amountA > 0 && amountB > 0, "Invalid amounts");

        // Переводим токены от провайдера ликвидности
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        // Обновляем резервы
        reserveA = reserveA.add(amountA);
        reserveB = reserveB.add(amountB);

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    // Функция удаления ликвидности
    function removeLiquidity(uint256 amountA, uint256 amountB) external {
        require(amountA > 0 && amountB > 0, "Invalid amounts");
        require(reserveA >= amountA && reserveB >= amountB, "Insufficient reserves");

        // Проверка основной логики выхода — здесь вы должны учитывать пропорции, но сделаем упрощенно
        reserveA = reserveA.sub(amountA);
        reserveB = reserveB.sub(amountB);

        // Переводим токены обратно провайдеру ликвидности
        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        emit LiquidityRemoved(msg.sender, amountA, amountB);
    }

    // Функция для обмена токенов
    function swap(uint256 amountIn, address fromToken) external {
        require(amountIn > 0, "Invalid input amount");

        // Определяем, какой токен переводится, и обновляем резервы
        uint256 amountOut;
        if (fromToken == address(tokenA)) {
            amountOut = getAmountOut(amountIn, reserveA, reserveB);
            require(amountOut > 0, "Output amount must be greater than zero");

            // Переводим токены
            tokenA.transferFrom(msg.sender, address(this), amountIn);
            tokenB.transfer(msg.sender, amountOut);
            
            reserveA = reserveA.add(amountIn);
            reserveB = reserveB.sub(amountOut);
        } else if (fromToken == address(tokenB)) {
            amountOut = getAmountOut(amountIn, reserveB, reserveA);
            require(amountOut > 0, "Output amount must be greater than zero");

            // Переводим токены
            tokenB.transferFrom(msg.sender, address(this), amountIn);
            tokenA.transfer(msg.sender, amountOut);

            reserveB = reserveB.add(amountIn);
            reserveA = reserveA.sub(amountOut);
        } else {
            revert("Invalid token address");
        }

        emit Swapped(msg.sender, fromToken, fromToken == address(tokenA) ? address(tokenB) : address(tokenA), amountIn, amountOut);
    }
    //функция расчета вывода
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256) {
    require(amountIn > 0, "Invalid input amount"); //проверка входящих сумм
    require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity"); 

    // Применение формулы автоматического создания рынка (AMM)
    uint256 amountInWithFee = amountIn.mul(997); // 0.3% комиссии
    uint256 numerator = amountInWithFee.mul(reserveOut);
    uint256 denominator = reserveIn.mul(1000).add(amountInWithFee);
    return numerator / denominator;
}

}
