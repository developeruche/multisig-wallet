import {
    chain
  } from 'wagmi'


export const CHAIN_ID = chain.polygonMumbai.id;
export const SCAN_BASE_URL = "";
// export const BANK_CONTRACT_ADDRESS = "0xc04E870738Cc98F70B0d93A7c8D6353c46e1e495";
export const BANK_CONTRACT_ADDRESS = "0x8DDCfe8a48Ec2E0666d29908a2A547Ba7D3bb797"; // polygon testnet 
export const FACTORY_CONTRACT_ADDRESS = "0xd06Bf53e2d58D7bd2bf066cd7DF98B806139A9e6";


export const storeNewWalletAddress = async (address: string) => {
  await localStorage.setItem("consense_wallet_address", address);
}


export const storeConfirmation = async (amount: string) => {
  await localStorage.setItem("consense_wallet_con", amount);
}


export const getWalletAddress = async () => {
  let address = await localStorage.getItem("consense_wallet_address");
  return address;
}


export const getConfirmation = async () => {
  let address = await localStorage.getItem("consense_wallet_con");
  return address;
}

