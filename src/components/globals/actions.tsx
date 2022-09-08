import {
    chain
  } from 'wagmi'


export const CHAIN_ID = chain.polygonMumbai.id;
export const SCAN_BASE_URL = "";
export const BANK_CONTRACT_ADDRESS = "0x8DDCfe8a48Ec2E0666d29908a2A547Ba7D3bb797";
export const FACTORY_CONTRACT_ADDRESS = "0x525728DDb14195C02631BF4cACC57eF84658a415";


export const storeNewWalletAddress = async (address: string) => {
  await localStorage.setItem("consense_wallet_address", address);
}


export const getWalletAddress = async () => {
  let address = await localStorage.getItem("consense_wallet_address");
  return address;
}




