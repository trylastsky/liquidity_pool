const add_liquidity = async (signer:any, contract:any, sending_token_contract:any) => {
        try {
            const prompt_value:string|null = window.prompt("Введите число токенов которое хотите добавить в ликвидность"); //prompt value значение из input alert
        
            if(prompt_value && !isNaN(Number(prompt_value))) { //проверка на корректный ввод значения
                const value = ethers.parseUnits(prompt_value, 12);
                const tx = await contract?.connect(signer).add_liquidity(Number(value), sending_token_contract); //транзакция call покупка токена значение должно быть строкой
                await tx.wait(); //ожидаем подтверждение транзакции
                alert(`Успешная транзакция!`);
                get_pools();
            }
            else { //если prompt_value не прошло проверку
                alert("Введите коректное значение");
            }
        }
        catch(err:any) {
            alert(`Недостаточно средств для пополнения пула ликвидностью, код ошибки ${err}`);
        }
}

export default add_liquidity;