# Liquidity

Это руководство по запуску системы Liquidity Poll (Backend)

Чтобы запустить систему, нам понадобиться два терминала.


В первом Терминале - мы поднимаем локальную сеть hardhat
```shell 
npx hardhat node

```

Во втором Терминале - компилируем и деплоим контракты на локальную сеть hardhat
```shell
npx hardhat ignition deploy ./ignition/modules/Deploy.ts --network localhost
```

Готово, backend запущен.