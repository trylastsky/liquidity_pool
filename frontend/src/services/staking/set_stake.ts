import { ethers } from "ethers";

 const set_stake = async (signer:any,contract:any) => {
        try {
            const prompt_value = window.prompt("Какое количество PROFI вы хотите положить на счет стэйкинга?");
            if(prompt_value && !isNaN(Number(prompt_value))) {
                const value = ethers.parseUnits(prompt_value, 12); //расчет сколько  PROFI отправится на счет смарт контракта
                const tx = await contract?.connect(signer).stake(Number(value));
                await tx.wait();
                alert(`Внесено ${prompt_value} PROFI`);
            }
            else {
                alert("Введите корректное число PROFI!");
            }
        }
        catch(err:any) {
            alert(`На вашем счете недостаточно PROFI, код ошибки:${err.revert.args}`);
        }
    }

export default set_stake;

