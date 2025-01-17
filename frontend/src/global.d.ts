declare global { //задаем глобальный тип

  interface Window { //разрешаем метамаску быть провайдером XD
  ethereum: any
}

}

export interface Connect_interface {
  signer:ethers.Signer | null,
  setSigner: (signer:ethers.Signer | null) => void,
  provider: ethers.Provider,
  setProvider: (provider:ethers.Provider | null) => void
}