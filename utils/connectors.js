import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  250: "https://rpc.ftm.tools/",
  56: "https://bsc-dataseed.binance.org/",
  4: "https://rinkeby-light.eth.linkpool.io/",
};

export const injected = new InjectedConnector({
  supportedChainIds: [250, 56, 4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 250: RPC_URLS[250], 56: RPC_URLS[56], 4: RPC_URLS[4] },
  qrcode: true,
});

export const connectorsByName = {
  Injected: injected,
  WalletConnect: walletconnect,
};
