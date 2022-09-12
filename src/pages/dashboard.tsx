import type { NextPage } from "next";
import Layout from "../components/globals/Layout";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillCopy, AiOutlineCopy, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NewProposalMd, NewProposalSm } from "../components/core/NewProposal";
import { BiDotsVerticalRounded } from "react-icons/bi"
import ClickAwayListener from 'react-click-away-listener';
import {getWalletAddress, CHAIN_ID, FACTORY_CONTRACT_ADDRESS,getConfirmation} from "../components/globals/actions";
import {useContractReads, useContractRead, useAccount} from "wagmi";
import {Factory, Wallet} from "../components/globals/abi";
import { toast } from 'react-toastify';
import router from "next/router";
import DashboardTransactions from "../components/core/DashboardTransactions";
import Head from "next/head"



const formatAddress = (address: any) => {
  return address?.substring(0, 6) + "..." + address?.slice(0, 4);
};

const Dashboard: NextPage = () => {
  const [copy, setCopy] = useState<boolean>(false);
  const [isNewProposalMd, setIsNewProposalMd] = useState<boolean>(false);
  const [isNewProposalSm, setIsNewProposalSm] = useState<boolean>(false);
  const { address } = useAccount();

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [showId, setShowId] = useState<string | number>("");


  const [owners, setOwner] = useState<any[]>();
  const [wallet, setWallet] = useState<any>();
  const [miniR, setMiniR] = useState<any>();







  let init_tx_data = [
    {
      addressOrName: FACTORY_CONTRACT_ADDRESS,
      contractInterface: Factory,
      functionName: 'getWalletOwners',
      args: [wallet]
    },
    {
      addressOrName: wallet,
      contractInterface: Wallet,
      functionName: 'getTransactionCount'
    },
  ]

  const { data: initData, isError: initDataError, isLoading: initDataLoading } = useContractReads({
    contracts: init_tx_data,
  })


  

  const openModal = (id: string | number) => {
    setDropdown(true);
    setShowId(id)
  }


  const obtainOwner = () => {

  }

  const obtainWallet = async () => {
    const addr = await getWalletAddress();
    const min = await getConfirmation();

    if(addr == undefined || addr == null || address == null) {
      console.log(address)
      toast.error('Your wallet is not connected', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      
      router.push("/");
      return;
    }
    setWallet(addr);
    setMiniR(min);
  }

  useEffect(() => {
    obtainWallet();
  }, [])

  useEffect(() => {
    if(copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000)
    }
  }, [copy]);



  return (
    <div>
      <Head>
        <title>Consense | Dashboard</title>
      </Head>
      <Layout>
        <div className="px-6 md:px-12 lg:px-24 text-white mt-8 proposal__dashboard">
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="text-2xl proposal__dashboard__address__title">Owners: </span>
              {initData && initData![0]?.map((addr, index) => (
                <span
                  key={index}
                  className="bg-base90 ml-3 px-4 py-2 text-xl rounded-lg proposal__dashboard__owner__address"
                >
                  {formatAddress(addr)}
                </span>
              ))}
            </div>
            <div className="flex items-center">
              <span className="text-2xl proposal__dashboard__multi__address__title">Wallet: </span>

              <span className="bg-base90 ml-3 px-4 py-2 text-xl rounded-lg proposal__dashboard__multi__address">
                {formatAddress(wallet)}
                <CopyToClipboard text={wallet} onCopy={() => setCopy(true)}>
                  <button>
                    {copy ? (
                      <AiFillCopy className="ml-2" color="green" />
                    ) : (
                      <AiOutlineCopy className="ml-2" />
                    )}
                  </button>
                </CopyToClipboard>
              </span>
            </div>
          </div>

          <div className="h-[50vh] bg-base80 rounded-xl mt-12 new__propsal__layout">
            <div className="flex justify-end">
              {/* <ActionButton  classprops='hidden md:block' title="Create Wallet" setAction={() => setIsCreateWalletMd(true)} />
            <ActionButton  classprops='md:hidden' title="Create Wallet" setAction={() => setIsCreateWalletSm(true)} /> */}

              <button
                onClick={() => setIsNewProposalSm(true)}
                className="md:hidden bg-primary mt-4 mr-4 text-xl py-2 px-4 rounded-lg flex items-center"
              >
                New Proposal <AiOutlinePlus className="ml-2" />{" "}
              </button>

              <div className="hidden md:block">
                <button
                  onClick={() => setIsNewProposalMd(true)}
                  className="bg-primary mt-4 mr-4 text-xl py-2 px-4 flex rounded-lg items-center new__propsal__layout__action"
                >
                  New Proposal <AiOutlinePlus className="ml-2" />{" "}
                </button>
              </div>
            </div>
          </div>
          
          {
            initData && <DashboardTransactions openModal={openModal} wallet={wallet} Wallet={Wallet} txCount={initData![1]} min={miniR}/>
          }
        </div>
      </Layout>



      <NewProposalMd
        setIsNewProposalMd={setIsNewProposalMd}
        isNewProposalMd={isNewProposalMd}
        wallet={wallet}
      />

      <NewProposalSm
        isNewProposalSm={isNewProposalSm}
        setIsNewProposalSm={setIsNewProposalSm}
      />
    </div>
  );
};

export default Dashboard;
