// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GerdaCoin is ERC20 {
    uint64 constant public priceGerda = 1 ether; //цена токена в ether
    constructor() ERC20("GerdaCoin", "GERDA") {
        uint _totalSupply = 100000 * 10 ** decimals(); // 100 000 tokens gerda
        _mint(address(this), _totalSupply); // банк GERDA составит 10 000 000
    }
    //показать баланс токена
    function balanceGerdaCoin(address _adr) public view returns(uint balanceGERDA) { 
        balanceGERDA = balanceOf(_adr);
    }   

    function transferGerdaCoin(address _from, address _to, uint _value) public { // перевод токена
        _transfer(_from, _to, _value); 
    }

    function buyGerda() public payable {
        require(msg.value >= 10 **(18 - decimals()),"Insufficient Ether sent");
        uint ost = msg.value % 10**(18 - decimals());
        uint amountToken = (msg.value - ost) / (priceGerda / 10 ** decimals());
        uint ost2 = (msg.value - ost) % (priceGerda / 10 ** decimals());
        payable(msg.sender).transfer(ost + ost2);
        transferGerdaCoin(address(this), msg.sender, amountToken) ;
    }

}

contract KrendelCoin is ERC20 {
    uint64 constant public priceKrendel = 1.5 ether; //цена токена в ether
    constructor() ERC20("KrendelCoin", "KRENDEL") {
        uint _totalSupplyKRENDEL = 150000 * 10 ** decimals(); // 150 000 tokens gerda
        _mint(address(this), _totalSupplyKRENDEL); // банк GERDA составит 150 000
    }
    //показать баланс токена
    function balanceKrendelCoin(address _adr) public view returns(uint balanceKRENDEL) { //показать баланс токена
        balanceKRENDEL = balanceOf(_adr);
    }   

    function transferKrendelCoin(address _from, address _to, uint _value) public { // перевод токена
        _transfer(_from, _to, _value); 
    }

    function buyKrendel() public payable {
        require(msg.value >= 10 **(18 - decimals()),"Insufficient Ether sent");
        uint ost = msg.value % 10**(18 - decimals());
        uint amountToken = (msg.value - ost) / (priceKrendel / 10 ** decimals());
        uint ost2 = (msg.value - ost) % (priceKrendel / 10 ** decimals());
        payable(msg.sender).transfer(ost + ost2);
        transferKrendelCoin(address(this), msg.sender, amountToken) ;
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

    function buyRTK() public payable {
        require(msg.value >= 10 **(18 - decimals()),"Insufficient Ether sent");
        uint ost = msg.value % 10**(18 - decimals());
        uint amountToken = (msg.value - ost) / (priceRTK / 10 ** decimals());
        uint ost2 = (msg.value - ost) % (priceRTK / 10 ** decimals());
        payable(msg.sender).transfer(ost + ost2);
        transferRTKCoin(address(this), msg.sender, amountToken);
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
