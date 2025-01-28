import { ethers } from "ethers";

 const set_stake = async (signer:any,contract:any) => {
        try {
            const prompt_value = window.prompt("Какое количество PROFI вы хотите положить на счет стэйкинга?");
            if(prompt_value && !isNaN(Number(prompt_value))) {
                const value = ethers.parseUnits(prompt_value, 10**6); //расчет сколько  PROFI отправится на счет смарт контракта
                const tx = await contract?.connect(signer).set_stake({value:String(value)});
                await tx.wait();
                alert(`Внесено ${prompt_value} PROFI`);
            }
            else {
                alert("Введите корректное число PROFI!");
            }
        }
        catch(err) {
            alert("На вашем счете недостаточно PROFI");
        }
    }

export default set_stake;

