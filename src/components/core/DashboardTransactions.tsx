import React, {useState, useEffect} from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import ClickAwayListener from 'react-click-away-listener';
import {useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import { CHAIN_ID } from '../globals/actions';
import { toast } from 'react-toastify';
import router from "next/router";
import { ethers } from 'ethers';



const formatAddress = (address: any) => {
    return address?.substring(0, 6) + "..." + address?.slice(0, 4);
};


type Props = {
    wallet: any,
    openModal: any,
    Wallet: any;
    txCount: any;
    min: any;
}






export default function DashboardTransactions({wallet, openModal, Wallet, txCount, min}: Props) {
    const [transactions_, settransaction_] = useState<any>();
    const [dropdown, setDropdown] = useState<boolean[]>();
    const [currentTxId, setCurrentTxId] = useState<any>(null);
    const [guard, setGuard] = useState(false);

    

    let init_tx_data : any = [];

    for (let i = 0; i < txCount; i++) {
      init_tx_data.push(
        {
          addressOrName: wallet,
          contractInterface: Wallet,
          functionName: 'transactions',
          args: [i]
        }
      );

      dropdown?.push(false);
    }

    const { data: initData, isError: initDataError, isLoading: initDataLoading } = useContractReads({
      contracts: init_tx_data,
    });

    const { data:comfirmData, write:comfirmWrite, isError:comfirmIsError, error:comfirmError } = useContractWrite({
      mode: 'recklesslyUnprepared',
      addressOrName: wallet,
      contractInterface: Wallet,
      functionName: 'confirmTransaction',
      args: [currentTxId],
      chainId: CHAIN_ID
    });
  
  
    const { isLoading:confirmIsLoading, isSuccess:confirmIsSuccuess } = useWaitForTransaction({
      hash: comfirmData?.hash,
    });

    const { data:excecuteData, write:excecuteWrite, isError:excecuteIsError, error:excecuteError } = useContractWrite({
      mode: 'recklesslyUnprepared',
      addressOrName: wallet,
      contractInterface: Wallet,
      functionName: 'executeTransaction',
      args: [currentTxId],
      chainId: CHAIN_ID
    });
  
  
    const { isLoading:excecuteIsLoading, isSuccess:excecuteIsSuccess } = useWaitForTransaction({
      hash: excecuteData?.hash,
    });

    const { data:revokeData, write:revokeWrite, isError:revokeIsError, error:revokeError } = useContractWrite({
      mode: 'recklesslyUnprepared',
      addressOrName: wallet,
      contractInterface: Wallet,
      functionName: 'revokeConfirmation',
      args: [currentTxId],
      chainId: CHAIN_ID
    });
  
  
    const { isLoading:revokeIsLoading, isSuccess:revokeIsSuccess } = useWaitForTransaction({
      hash: revokeData?.hash,
    });



    const handleTxConfirmation = () => {
      if(currentTxId != null) {
        comfirmWrite();
      }
    }

    const handleTxExcecute = () => {
      if(currentTxId != null) {
        excecuteWrite();
      }
    }

    const handleTxRevoke = () => {
      if(currentTxId != null) {
        revokeWrite();
      }
    }

    const showLoadingToast = (state_: string) => {
      if(state_ == "one") {  
        toast.dismiss();      
        toast.loading('Confirming Proposal', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if(state_ == "two") {
        toast.dismiss();      
        toast.loading('Excecuting Proposal', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if(state_ == "three") {
        toast.dismiss();      
        toast.loading('Revoking Proposal', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else if(state_ == "four") {
        toast.dismiss();      
        toast.success('Proposal confirmed successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          router.reload()
        } else if(state_ == "five") {
        toast.dismiss();      
        toast.success('Proposal excecuted successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          router.reload()
        } else if(state_ == "six") {
          toast.dismiss();      
        toast.success('Proposal rovoked successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          router.reload()
      }
    }


  return (
    <>
      {
        initData && initData.map((tx: any, index) => {
          return (
            <>
            <div className="relative bg-base90 rounded-xl mt-10 mb-10" key={index}>

              <div className="multi__single__proposal">
                <div className="multi__single__proposal__sectionOne">
                  <div className="multi__single__proposal__sectionOne_1">
                    <p className="l_1">{tx.topic}</p>
                    <p className="l_2">{Number(ethers.utils.formatEther(tx.value.toString())).toFixed(2)} MATIC</p>
                    <p className="l_3">{formatAddress(tx.to)}</p>
                  </div>
                  <div className="multi__single__proposal__sectionOne_2">{tx.numConfirmations.toString()}/{min}</div>
                </div>
                <div 
                className="count cursor-pointer multi__single__proposal__sectionTwo" 
                onClick={() => {
                  let new_arr = [];
  
                  for (let i = 0; i < initData.length; i++) {
                    if(index == i) {
                      new_arr.push(true);
                    } else {
                      new_arr.push(false);
                    }
                  }
  
                  setDropdown(new_arr);
                }}
                >
                  <BiDotsVerticalRounded />
                </div>
              </div>
              
              {
                dropdown && dropdown![index] && (
                  <ClickAwayListener onClickAway={() => {
                    let new_arr = [];
    
                    for (let i = 0; i < initData.length; i++) {
                      if(index == i) {
                        new_arr.push(false);
                      } 
                    }
    
                    setDropdown(new_arr);
                  }}>
                    <div className="dropdown dropdown__transaction__proposal">
                      <p className="text-lg details_container"
                      onClick={() => { 
                        setCurrentTxId(index);
                        handleTxConfirmation();
                        console.log(currentTxId);
                       }}
                      >
                        Confirm
                      </p>
                      <p className="text-lg details_container"
                      onClick={() => { 
                        setCurrentTxId(index);
                        handleTxExcecute();
                        console.log(currentTxId);
                      }}
                      >
                        Execute
                      </p>
                      <p
                        className="text-lg details_container"
                        onClick={() => { 
                          setCurrentTxId(index);
                          handleTxRevoke();
                        console.log(currentTxId);
                      }}
                      >
                          Revoke
                        </p>
                      
                    </div>
                  </ClickAwayListener>
                )
              }
              <>{confirmIsLoading && showLoadingToast("one")}</>
              <>{excecuteIsLoading && showLoadingToast("two")}</>
              <>{revokeIsLoading && showLoadingToast("three")}</>
              <>{confirmIsSuccuess && showLoadingToast("four")}</>
              <>{excecuteIsSuccess && showLoadingToast("five")}</>
              <>{revokeIsSuccess && showLoadingToast("six")}</>
              </div>
            </>
          )
        })
      }
    </>
  )
}