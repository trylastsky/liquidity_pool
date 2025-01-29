import { ethers } from "ethers";

const swap_token = async (
        signer:any,
        pool_contract:any,
        amount:number,
        sended_token_address:string | null,
        received_token_address:string | null
    ) => {
        try {
            if(amount && !isNaN(amount)) {
                const token_value = ethers.parseUnits(String(amount), 12);
                const tx = await pool_contract.connect(signer).swap_token(Number(token_value), sended_token_address, received_token_address);
                await tx.wait();
                alert("Успешный обмен токенов");
            }
            else {
                alert("Введите корректное значение токенов");
            }
        }
        catch(err:any) {
            alert(`Недостаточно средств для обмена токенов, код ошибки ${err.code}`)
        }
}

export default swap_token;