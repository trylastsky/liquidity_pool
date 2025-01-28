const get_RW = async (signer:any,contract:any) => {
    try {
        const tx = await contract?.connect(signer).get_RW();
        await tx.wait();
        alert(`Награда получена`);
    }
    catch(err:any) {
        alert(`Вам нечего выводить! код ошибки:${err.revert.args}`);
    }
        
}

export default get_RW;