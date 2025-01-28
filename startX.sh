cd backend

npm install

npx hardhat clean

gnome-terminal -- npx hardhat node

sleep 5;

npx hardhat run --network localhost ./deploy.js

sleep 5;

cd ../frontend

npm i

npm run dev