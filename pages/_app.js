import "../style.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { Web3ContextApp } from "../contexts/web3Context";

const AppWrapper = ({ Component, pageProps }) => {
  return (
      <main
        className="w-5/6 pt-10 m-auto flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        <Navbar />
        <Component {...pageProps} />
      </main>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>dyFactor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
      <Web3ContextApp>
        <AppWrapper Component={Component} pageProps={pageProps} />
      </Web3ContextApp>
    </>
  );
}

export default MyApp;
