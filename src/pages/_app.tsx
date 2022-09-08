 import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider} from '../components/ThemeContext'
import "aos/dist/aos.css";
import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
} from 'wagmi';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from "../components/stateManager/store";


const { chains, provider, webSocketProvider } = configureChains([chain.polygonMumbai, chain.polygon],   [
  jsonRpcProvider({
    rpc: (chain) => ({
      http: `https://maximum-cold-voice.matic-testnet.discover.quiknode.pro/a1d6dd83e4bea19c9b833726656e641ed5f41b9e`,
    }),
  }),
],)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ThemeProvider>
      <WagmiConfig client={client}>
        <StoreProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        </StoreProvider>
      </WagmiConfig>

      <div id="app-bottom-sheet" />
      <div id="app-modal-root" />
    </ThemeProvider>
  )
  
 
}

export default MyApp;