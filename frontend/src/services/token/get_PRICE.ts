const get_PRICE = async (contract:any) => {
    const TOKEN_PRICE = await contract.PRICE();
    return Number(TOKEN_PRICE);
}

export default get_PRICE;