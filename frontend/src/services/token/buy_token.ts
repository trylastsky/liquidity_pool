import get_PRICE from "./get_PRICE";

const buy_token = async (signer:any,contract:any, set_balance: ((token_balance: number) => void)) => { //покупка токена
    try {
        const prompt_value:string|null = window.prompt("Введите число токенов которое хотите купить"); //prompt value значение из input alert
        const token_price = await get_PRICE(contract);
    
        if(prompt_value && !isNaN(Number(prompt_value))) { //проверка на корректный ввод значения
            const value = Number(prompt_value) * Number(token_price); //колво ETH списываемых за колво покупаемых токенов (token_value * token_price)
            const tx = await contract?.connect(signer).buy_token({value: String(value)}); //транзакция call покупка токена значение должно быть строкой
            await tx.wait(); //ожидаем подтверждение транзакции
            const balance = await contract.balanceOf(signer.address); //получение нового баланса
            set_balance(Number(balance) / 10**12); //динамическое обновление баланса после транзакции
            alert(`Успешная транзакция!`);
        }
        else { //если prompt_value не прошло проверку
            alert("Введите коректное значение");
        }
    }
    catch(err:any) {
        alert(`Недостаточно средств для покупки токена, код ошибки ${err}`);
    }
}

export default buy_token;