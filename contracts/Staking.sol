// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    IERC20 public lpToken; //стандарт токена LP(ERC20) развернут прямо в контракте staking
    uint256 public rewardPerSecond; //вознаграждение в секунду

    struct UserInfo {
        uint256 amount; // количество застаканных LP пользователем
        uint256 lastRewardTime; // последнее время получения награды пользователем
        uint256 reward; // накопленная награда пользователя
    }

    mapping(address => UserInfo) public userInfo;// мапа адресс пользователя -> информация о нем
    uint256 public totalLpStaked; //Глобальное количество LP

    constructor(IERC20 _lpToken, uint256 _rewardPerSecond) {
        lpToken = _lpToken;
        rewardPerSecond = _rewardPerSecond;
    }

    // staking LP токенов
    function stake(uint256 amount) external {
        UserInfo storage user = userInfo[msg.sender];
        
        //рассчитываем вознаграждение перед staking
        uint256 reward = calculateReward(msg.sender);//вычисляем вознаграждение для пользователя перед тем как они начнут стейкать больше токенов

        totalLpStaked += amount; //обновляем общее кол-во стейкнутых LP токенов в контракте
        user.amount += amount;//Обновляем колво токенов стейкнутых пользователем
        user.lastRewardTime = block.timestamp; //время последнего обновления вознаграждения
        user.reward += reward; //добавляем текущую награду в общую награду пользователя

        lpToken.transferFrom(msg.sender, address(this), amount); //транзакция отправки пользователем lp на staking
    }

   
    function claimReward() external { // получение вознаграждения
        UserInfo storage user = userInfo[msg.sender]; //получаем инфо о пользователе из мапы
        uint256 reward = calculateReward(msg.sender);//вычисляем награду по функции 
        user.reward += reward; //добавляем полученное значение текущей награды с общей
        user.lastRewardTime = block.timestamp; //обновляем время последнего получения вознаграждения

        // если есть токен для вознаграждения - rewardToken.mint(msg.sender, user.reward);

        user.reward = 0; // Обнуление вознаграждения после получения
    }

    //Вычисление вознаграждения
    function calculateReward(address userAddress) internal view returns (uint256) {
    UserInfo storage user = userInfo[userAddress]; //получаем инфо о пользователе
    
    uint256 secondsStaked = block.timestamp - user.lastRewardTime; //вычисляем время в течении которого пользователь застакал токены

    
    uint256 multiplier = 1e18; // используем 1e18 для работы с дробными числами - для избежания потерть точности
    uint256 rewardFactor = (secondsStaked / 30 days) * (50 * multiplier / 1000); // 0.05 = 50/1000 // rewardFactor увеличивается каждые 30 дней на 5% (0.05) от общего количества токенов, которые пользователь застакал.
    uint256 rw = user.amount * secondsStaked * rewardPerSecond * ((user.amount * multiplier / totalLpStaked) + multiplier) / multiplier; //формула вычисления награды

    return rw + rewardFactor; //возвращаем итоговое вознаграждение
}
}
