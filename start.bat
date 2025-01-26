@echo off


cd backend
call npm i
call npx hardhat clean
start cmd /k "npx hardhat node"
call npx hardhat run --network localhost ./deploy.js


:: Запускаем фронтенд
cd ../frontend
call npm run dev