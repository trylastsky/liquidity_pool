interface Window {
    ethereum: {
      utils: any;
      removeListener(arg0: string, arg1: () => void): unknown;
      on(arg0: string, arg1: (accounts: string[]) => void): unknown;
      isMetaMask: boolean;
      request: (args: { method: string }) => Promise<any>;
    };
  }
  

  interface IconData {
    src: string;
    alt: string;
    label: string;
}