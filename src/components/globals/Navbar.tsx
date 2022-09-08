import Link from "next/link";
import React, { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ActionButton from "../core/ActionBtn";
import { HiOutlineFingerPrint } from 'react-icons/hi';
import { TbLayoutDashboard } from 'react-icons/tb';
import router from "next/router";
import { chain, useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'





interface NavBartItemProps {
  title?: string
  classprops?: string
  src?: HTMLImageElement
}

const MobileNavBarItem: React.FC<NavBartItemProps>= ({ title, classprops }) => (
  <li className={`hover:bg-primary py-5 rounded-lg text-xl cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar: React.FC<NavBartItemProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { address, connector:sss, isConnected } = useAccount();
  const connector = new MetaMaskConnector({
    chains: [chain.polygon],
  });
  
  // const { address, connector, isConnected } = useAccount()

  const handleConnnectWallet = () => {connect({ connector }); console.log("Connecting")};

  const formatAddress = (address: any) => {
    return address?.substring(0, 6) + "..." + address?.slice(0, 4);
  };

  return (
    <Fragment>
      <div className="static">

        <div className='w-full h-16 md:h-24 py-4 bg-primary text-white flex justify-between items-center px-6 md:px-12 lg:px-24'>
          <div className="lg:w-[55%] w-[50%]">
            <h1 className='text-3xl flex navbar__logo cursor-pointer ' onClick={() => {router.push("/")}}><HiOutlineFingerPrint/><span>Consense</span></h1>
          </div>
          <div className="flex dashboard__link">
            <TbLayoutDashboard />
            <div className="dashboard__link__inner">
              <Link href="/dashboard">
                <a>
                  Dashboard
                </a>
              </Link>
            </div>
          </div>
          <div className="lg:w-[30%] w-[35%] md:flex justify-end hidden">
            {
              isConnected ? (
                <>
                  <button className={`box-border relative inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none `}>
                    <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                    <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                    <span className="relative flex items-center text-sm">
                    <svg className="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    {formatAddress(address)}
                    </span>
                  </button>
                </>
              ) : (
                <ActionButton title="Connect Wallet" setAction={handleConnnectWallet} />
              )
            }
            
          </div>

          <div className="md:hidden">
            <AiOutlineMenu className='cursor-pointer' size={"24px"} onClick={() => setIsOpen(true)} />
          </div>
        </div>

        {
          isOpen && (
            <Fragment>
              <div className='p-4 text-white md:hidden absolute top-0 right-0 w-full sm:w-[70%] bg-base70 h-[100vh]'>
                  <AiOutlineClose size={"28px"} className='cursor-pointer absolute right-4' onClick={() => setIsOpen(false)} />
                  <ul className='pt-14 text-center'>

                    <Link href={"/dashboard"}>
                      <a>
                        <MobileNavBarItem title="Dashboard" />
                      </a>
                    </Link>

                    <MobileNavBarItem classprops="mt-4" title="Connect Wallet" />
                  </ul>
              </div>
            </Fragment>
          )
        }
        </div>
    </Fragment>
  )
  
};

export default Navbar;


