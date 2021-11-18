import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://main-light.eth.linkpool.io/",
  4: "https://rinkeby-light.eth.linkpool.io/",
  56: "https://bsc-dataseed.binance.org/",
  250: "https://rpc.ftm.tools/",
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 56, 250],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4], 56: RPC_URLS[56], 250: RPC_URLS[250] },
  qrcode: true,
});

export const connectorsByName = {
  Injected: injected,
  WalletConnect: walletconnect,
};
