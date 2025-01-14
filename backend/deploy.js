const {ethers} = require('hardhat')

async function deploy() { //деплой смарт контракта
    //создание токенов по образу Coin

    const GerdaCoin = await ethers.getContractFactory("Coin") //получение смарт-контракта Coin
    const gerdaCoin = await GerdaCoin.deploy(
        "GerdaCoin", //имя нашего токена
        "GERDA", //символ нашего токена
        100000, //капитализация нашего токена
        12, //числа после нуля для нашего токена
        10,  //стоимость в ETH в расчете 10 = 1 ETH
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" //Адресс владельца
    )

    const fs = require('fs')
    const path = require('path')

    //записываем API и адресс

    const GERDA = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Coin.json")

    let _GERDA = fs.existsSync(GERDA) ? JSON.parse(fs.readFileSync(GERDA)) : {}
    _GERDA.gerda = gerdaCoin.target

    fs.writeFileSync(GERDA, JSON.stringify(_GERDA))

    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const KrendelCoin = await ethers.getContractFactory("Coin")
    const krendelCoin = await KrendelCoin.deploy(
        "KrendelCoin", 
        "KRENDEL",
        150000,
        12,
        15,
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    )

    const KRENDEL = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Coin.json")

    let _KRENDEL = fs.existsSync(KRENDEL) ? JSON.parse(fs.readFileSync(KRENDEL)) : {}
    _KRENDEL.krendel = krendelCoin.target

    fs.writeFileSync(KRENDEL, JSON.stringify(_KRENDEL))

    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const RTKCoin = await ethers.getContractFactory("Coin")
    const rTKCoin = await RTKCoin.deploy(
        "RTKCoin", 
        "RTK",
        300000,
        12,
        30,
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    )

    const RTK = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Coin.json")

    let _RTK = fs.existsSync(RTK) ? JSON.parse(fs.readFileSync(RTK)) : {}
    _RTK.rtk = rTKCoin.target

    fs.writeFileSync(RTK, JSON.stringify(_RTK))

    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const Professional = await ethers.getContractFactory("Coin")
    const professional = await Professional.deploy(
        "Professional", 
        "PROFI",
        0,
        6,
        60,
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    )

    const PROFI = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Coin.json")

    let _PROFI = fs.existsSync(PROFI) ? JSON.parse(fs.readFileSync(PROFI)) : {}
    _PROFI.profi = professional.target

    fs.writeFileSync(PROFI, JSON.stringify(_PROFI))

    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const Factory = await ethers.getContractFactory("Factory")
    const factory = await Factory.deploy()

    const factory_ = path.join(__dirname, "./artifacts/contracts/Factory.sol/Factory.json")

    let _factory = fs.existsSync(factory_) ? JSON.parse(fs.readFileSync(factory_)) : {}
    _factory.address = factory.target

    fs.writeFileSync(factory_, JSON.stringify(_factory))




    await factory.deployPool(
        gerdaCoin.target,
        1500,
        krendelCoin.target,
        1000,
        professional.target,
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );

    await factory.deployPool(
        krendelCoin.target,
        2000,
        rTKCoin.target,
        1000,
        professional.target,
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );

    const add = await factory.getAllAddressPools()
    console.log(add)

    const pools_ = path.join(__dirname, './artifacts/contract/Pool.sol/Pool.json') 

    let _pools = fs.existsSync(pools_) ? JSON.parse(fs.readFileSync(pools_)) : {}
    _pools.add0 = add[0]
    _pools.add1 = add[1]

    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const Router = await ethers.getContractFactory("Router")
    const router = await Router.deploy(
        gerdaCoin.target,
        krendelCoin.target,
        rTKCoin.target,
        add[0],
        add[1]
    )

    const router_ = path.join(__dirname, "./artifacts/contracts/Router.sol/Router.json")

    let _router = fs.existsSync(router_) ? JSON.parse(fs.readFileSync(router_)) : {}
    _router.address = router.target

    fs.writeFileSync(router_, JSON.stringify(_router))

    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const Staking = await ethers.getContractFactory("Staking")
    const staking = await Staking.deploy(
        professional.target,
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    )

    const staking_ = path.join(__dirname, "./artifacts/contracts/Staking.sol/Staking.json")

    let _staking = fs.existsSync(staking_) ? JSON.parse(fs.readFileSync(staking_)) : {}
    _staking.address = staking.target

    fs.writeFileSync(staking_, JSON.stringify(_staking))
}

deploy()
.then(() => {
    console.log('Success')
})
.catch(err => {
    console.error(err)
})