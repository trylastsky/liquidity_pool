import { writeFileSync } from "fs";
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEFAULT_INITIAL_SUPPLY = 1000000; // 1 миллион токенов

const TokenModule = buildModule("TokenModule", (m) => {
    const initialSupplyGerda = m.getParameter("initialSupplyGerda", DEFAULT_INITIAL_SUPPLY);
    const initialSupplyKrendel = m.getParameter("initialSupplyKrendel", DEFAULT_INITIAL_SUPPLY);
    const initialSupplyRTK = m.getParameter("initialSupplyRTK", DEFAULT_INITIAL_SUPPLY);

    // Развертывание контрактов
    const gerdaCoin = m.contract("GerdaCoin", [initialSupplyGerda]);
    const krendelCoin = m.contract("KrendelCoin", [initialSupplyKrendel]);
    const rtkCoin = m.contract("RTKCoin", [initialSupplyRTK]);


    console.log(gerdaCoin)

    // Объект для хранения адресов
    // const deployedContracts = {
    //     gerdaCoin: gerdaCoin.address,
    //     krendelCoin: krendelCoin.address,
    //     rtkCoin: rtkCoin.address,
    // };



    // Запись в JSON-файл
    // writeFileSync("deployedContracts.json", JSON.stringify(deployedContracts, null, 2));

    return { gerdaCoin, krendelCoin, rtkCoin }; // Возвращаем развернутые контракты
});

export default TokenModule;
