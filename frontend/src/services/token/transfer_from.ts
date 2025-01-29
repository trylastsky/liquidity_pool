import { ethers } from "ethers";

const transfer_from = async (signer:any,contract:any, set_balance:any) => {
    try {
        const prompt_value:string | null = window.prompt("Введите число токенов которое хотите перевести");
    
        if(prompt_value && !isNaN(Number(prompt_value))) {
            const address_prompt_value:string|null = window.prompt("Введите адресс на который вы хотите отправить токены");
            if(address_prompt_value) {
                const value = ethers.parseUnits(prompt_value, 12);
                const tx = await contract?.connect(signer).transferFrom(signer.address, address_prompt_value, String(value)); 
                await tx.wait(); //ожидаем подтверждение транзакции
                const balance = await contract.balanceOf(signer.address); //получение нового баланса
                set_balance(Number(balance) / 10**12); //динамическое обновление баланса после транзакции
                alert(`Успешная транзакция!`);
            }
            else {
                alert("Введите значение")
            }
        }
        else { //если prompt_value не прошло проверку
            alert("Введите коректное значение");
        }
    }
    catch(err:any) {
        alert(`Недостаточно токенов для перевода или введен некоректный адресс получателя ${err}`);
    }
}


export default transfer_from;