const {ethers} = require('hardhat')

const fs = require('fs')
const path = require('path')

const tom = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; //адресс тома
const ben = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; //адресс бена
const rick = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; //адресс рика
const owner = "0x90F79bf6EB2c4f870365E785982E1f101E93b906"; //Адресс владельца

function logger(message) {
    console.clear();
    console.log(message);
}

async function deploy() { //деплой смарт контракта
    const Token = await ethers.getContractFactory("Token"); //образ монеты

    const GerdaCoin = await Token.deploy(
        "GerdaCoin", //имя нашего токена
        "GERDA", //символ нашего токена
        100000, //капитализация нашего токена
        12, //числа после нуля для нашего токена
        10,  //стоимость в ETH в расчете 10 = 1 ETH
        owner //Адресс владельца
    )
    //записываем API и адресс
    const GERDA = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Token.json")

    let _GERDA = fs.existsSync(GERDA) ? JSON.parse(fs.readFileSync(GERDA)) : {}
    _GERDA.gerda = GerdaCoin.target

    fs.writeFileSync(GERDA, JSON.stringify(_GERDA))
    console.log("Монета GERDA создана");
    // ---------------------------------------------------------------------------------------------------------------------------------------
    const KrendelCoin = await Token.deploy(
        "KrendelCoin", 
        "KRENDEL",
        150000,
        12,
        15,
        owner
    )

    const KRENDEL = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Token.json")

    let _KRENDEL = fs.existsSync(KRENDEL) ? JSON.parse(fs.readFileSync(KRENDEL)) : {}
    _KRENDEL.krendel = KrendelCoin.target

    fs.writeFileSync(KRENDEL, JSON.stringify(_KRENDEL))
    logger("Монета KRENDEL создана");
    // ---------------------------------------------------------------------------------------------------------------------------------------
    const RTKCoin = await Token.deploy(
        "RTKCoin", 
        "RTK",
        300000,
        12,
        30,
        owner
    )
    const RTK = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Token.json")

    let _RTK = fs.existsSync(RTK) ? JSON.parse(fs.readFileSync(RTK)) : {}
    _RTK.rtk = RTKCoin.target

    fs.writeFileSync(RTK, JSON.stringify(_RTK))
    logger("Монета GERDA создана");
    // ---------------------------------------------------------------------------------------------------------------------------------------
    const Professional = await Token.deploy(
        "Professional", 
        "PROFI",
        0,
        6,
        60,
        owner
    )

    const PROFI = path.join(__dirname, "./artifacts/contracts/ERC20.sol/Token.json")

    let _PROFI = fs.existsSync(PROFI) ? JSON.parse(fs.readFileSync(PROFI)) : {}
    _PROFI.profi = Professional.target

    fs.writeFileSync(PROFI, JSON.stringify(_PROFI))
    logger("Монета PROFI создана");
    // Factory

    const Factory = await ethers.getContractFactory("Factory")
    const factory = await Factory.deploy()

    const factory_ = path.join(__dirname, "./artifacts/contracts/Factory.sol/Factory.json")

    let _factory = fs.existsSync(factory_) ? JSON.parse(fs.readFileSync(factory_)) : {}
    _factory.address = factory.target

    fs.writeFileSync(factory_, JSON.stringify(_factory))
    logger("Контракт Factory развернут");
    //регистрируем пользователей
    await factory.registration_user("Tom", tom);
    await factory.registration_user("Ben", ben);
    await factory.registration_user("Rick", rick);
    await factory.registration_user("Owner", owner);
    console.log("Пользователи зарегистрированны");

    await factory.deploy_pool( //Соотношение 1500ETH / 1500ETH
        GerdaCoin.target,
        1500,
        KrendelCoin.target,
        1000,
        Professional.target,
        tom
    );
    logger("Пул GERDA-KRENDEL создан");
        
    await factory.deploy_pool( //соотношение 3000ETH / 3000ETH
        KrendelCoin.target,
        2000,
        RTKCoin.target,
        1000,
        Professional.target,
        ben
    );
    logger("Пул KRENDEL-RTK создан");



    const add = await factory.get_pools()

    const pools_ = path.join(__dirname, './artifacts/contract/Pool.sol/Pool.json') 

    let _pools = fs.existsSync(pools_) ? JSON.parse(fs.readFileSync(pools_)) : {}
    _pools.add0 = add[0]
    _pools.add1 = add[1]

    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const Router = await ethers.getContractFactory("Router")
    const router = await Router.deploy(
        GerdaCoin.target,
        KrendelCoin.target,
        RTKCoin.target,
        add[0],
        add[1]
    )

    const router_ = path.join(__dirname, "./artifacts/contracts/Router.sol/Router.json")

    let _router = fs.existsSync(router_) ? JSON.parse(fs.readFileSync(router_)) : {}
    _router.address = router.target

    fs.writeFileSync(router_, JSON.stringify(_router))
    logger("Router подключен к системе");
    // ---------------------------------------------------------------------------------------------------------------------------------------
    
    const Staking = await ethers.getContractFactory("Staking")
    const staking = await Staking.deploy(
        Professional.target,
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    )

    const staking_ = path.join(__dirname, "./artifacts/contracts/Staking.sol/Staking.json")

    let _staking = fs.existsSync(staking_) ? JSON.parse(fs.readFileSync(staking_)) : {}
    _staking.address = staking.target

    fs.writeFileSync(staking_, JSON.stringify(_staking))
    logger("Staking подключен к системе");
}

deploy()
.then(() => {
    logger('Операция выполнена успешно');
})
.catch(err => {
    console.error(err)
})