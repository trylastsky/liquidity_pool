// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Pool.sol";

contract Factory {
    address[] public  pools;

    function deployPool(
        address token1, 
        uint amount1,   //передаётся целое количество токена
        address token2,
        uint amount2,   //передаётся целое количество токена
        address profi,
        address owner
    ) public returns (address) {
        Pool newPool = new Pool(token1, amount1 * 1e12, token2, amount2 * 1e12, profi, owner);
        pools.push(address(newPool));
        user[msg.sender].Pools.push(UserPool(pools.length, address(newPool)));
        return address(newPool);
    }

    function getAllAddressPools() public view returns (address[] memory) {
        return pools;
    }

    struct UserPool {
        uint Id;
        address Address;
    }

    struct User {
        string Name;
        UserPool[] Pools;
    }

    mapping (address => User) user;

    function auth() public view returns(User memory) {
        return user[msg.sender];
    }

    constructor() {
        user[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266].Name = 'Tom';
        user[0x70997970C51812dc3A010C7d01b50e0d17dc79C8].Name = 'Ben';
        user[0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC].Name = 'Rick';
    }
}