import {
    chain
  } from 'wagmi'


export const CHAIN_ID = chain.ropsten.id;
export const SCAN_BASE_URL = "";
export const BANK_CONTRACT_ADDRESS = "0xc04E870738Cc98F70B0d93A7c8D6353c46e1e495";
// export const BANK_CONTRACT_ADDRESS = "0x8DDCfe8a48Ec2E0666d29908a2A547Ba7D3bb797"; // polygon testnet 
export const FACTORY_CONTRACT_ADDRESS = "0x6b4Ff998137bA6e3EF739bAe69e9Ff44c993B37a";


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

