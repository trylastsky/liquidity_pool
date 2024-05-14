// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GerdaCoin is ERC20 {
    uint64 constant public priceGerda = 1 ether; //цена токена в ether
    constructor() ERC20("GerdaCoin", "GERDA") {
        uint _totalSupply = 100000 * 10 ** 12; // 100 000 tokens gerda
        _mint(address(this), _totalSupply); // банк GERDA составит 10 000 000
    }
    //показать баланс токена
    function balanceGerdaCoin(address _adr) public view returns(uint balanceGERDA) { 
        balanceGERDA = balanceOf(_adr) / 10 ** 12 ;
    }   

    function transferGerdaCoin(address _from, address _to, uint _value) public { // перевод токена
        _transfer(_from, _to, _value); 
    }

    function buyToken() public payable {
        require(msg.value >= 10 ** 6,"Insufficient Ether sent");
        require(msg.value > 0, "Insufficient Ether sent"); // Проверяем, что отправлено достаточное количество эфиров
        // uint tokensAmount = msg.value / priceGerda;
        uint tokensAmount = (msg.value * 10 ** 12) / priceGerda;
        payable(msg.sender).transfer(msg.value % priceGerda); //отправляем обратно излишние средства
        transferGerdaCoin(address(this), msg.sender, tokensAmount); // 
    }

}

contract KrendelCoin is ERC20 {
    uint64 constant public priceKrendel = 1.5 ether; //цена токена в ether
    constructor() ERC20("KrendelCoin", "KRENDEL") {
        uint _totalSupplyKRENDEL = 150000; // 150 000 tokens gerda
        _mint(address(this), _totalSupplyKRENDEL); // банк GERDA составит 150 000
    }
    //показать баланс токена
    function balanceKrendelCoin(address _adr) public view returns(uint balanceKRENDEL) { //показать баланс токена
        balanceKRENDEL = balanceOf(_adr);
    }   

    function transferKrendelCoin(address _from, address _to, uint _value) public { // перевод токена
        _transfer(_from, _to, _value); 
    }
}

contract RTKCoin is ERC20 {
    uint64 constant public priceRTK = 3 ether; //цена токена в ether
    constructor() ERC20("RTKCoin", "RTK") {
        uint _totalSupplyKRENDEL = 300000; // 300 000 tokens gerda
        _mint(address(this), _totalSupplyKRENDEL); // банк GERDA составит 300 000
    }
    //показать баланс токена
    function balanceRTKCoin(address _adr) public view returns(uint balanceRTK) { //показать баланс токена
        balanceRTK = balanceOf(_adr);
    }

    function transferRTKCoin(address _from, address _to, uint _value) public { // перевод токена
        _transfer(_from, _to, _value); 
    }

}

contract Professional is ERC20 { //токен PROFI для начисления бонусов за вклад в пул
    uint64 constant public pricePROFI = 6 ether; // цена токена PROFI == 6 eth
    constructor() ERC20("Professional", "PROFI") {
    }

    function balancePROFI(address _adr) public view returns(uint _balancePROFI) { //показать баланс токена
        _balancePROFI = balanceOf(_adr);
    }

     function transferPROFI(address _from, address _to, uint _value) public { // перевод токена
        _transfer(_from, _to, _value); 
    }
}
