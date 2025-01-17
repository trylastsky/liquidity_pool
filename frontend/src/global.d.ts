declare global { //задаем глобальный тип

  interface Window { //разрешаем метамаску быть провайдером XD
  ethereum: any
}

}

export interface Connect_interface {
  signer:ethers.Signer | null,
  setSigner: (signer:ethers.Signer | null) => void,
  provider: ethers.Provider,
  setProvider: (provider:ethers.Provider | null) => void,
  // contract: ethers.Contract | null,
  // setContract: (contract:ethers.Contract | null) => void
}

export interface init_contract_interface {
  contract: ethers.Contract;
}