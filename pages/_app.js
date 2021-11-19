import "../style.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import {
  Web3ReactProvider,
  UnsupportedChainIdError,
  useWeb3React,
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { ScoringContextApp } from "../contexts/scoringContext";
import { NftContextApp } from "../contexts/nftContext";
import { NftProvider } from "use-nft";

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const AppWrapper = ({ Component, pageProps }) => {
  const context = useWeb3React();
  const { error, connector, provider } = context;
  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [error]);
  return (
    <NftProvider fetcher={["ethers", {provider}]}>
      <main
        className="w-5/6 pt-10 m-auto flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Navbar />
        <Component {...pageProps} />
      </main>
    </NftProvider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ScoringContextApp>
          <NftContextApp>
            <Head>
              <title>dyFactor</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <link rel="shortcut icon" href="/logo-icon.png" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="true"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet"
              />
            </Head>
            <AppWrapper Component={Component} pageProps={pageProps} />
          </NftContextApp>
        </ScoringContextApp>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
