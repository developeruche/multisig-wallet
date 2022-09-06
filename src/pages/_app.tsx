 import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider} from '../components/ThemeContext'
import "aos/dist/aos.css";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';


const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ apiKey: '965a992142e64206ad4e67bd922124af' }),
  publicProvider(),
])

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
        <Component {...pageProps} />
      </WagmiConfig>

      <div id="app-bottom-sheet" />
      <div id="app-modal-root" />
    </ThemeProvider>
  )
  
 
}

export default MyApp;