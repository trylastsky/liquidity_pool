declare global { //задаем глобальный тип

  interface Window { //разрешаем метамаску быть провайдером XD
  ethereum;
}

}

export interface Connect_interface {
  signer:ethers.Signer | null,
  setSigner: (signer:ethers.Signer | null) => void,
  provider: ethers.Provider,
  setProvider: (provider:ethers.Provider | null) => void,
}

export interface init_contract_interface {
  contract: ethers.Contract;
}

export interface liquidity_pool {
  id: number;
  address_pool: string;
  type: string;
  owner_pool_address:string;
  owner_pool_name:string;
  token1_address:string;
  token2_address:string;
  token1_reserve:number;
  token2_reserve:number;
}