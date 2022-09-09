import React, {useState, useEffect} from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import ClickAwayListener from 'react-click-away-listener';
import {useContractReads } from "wagmi";



const formatAddress = (address: any) => {
    return address?.substring(0, 6) + "..." + address?.slice(0, 4);
};


type Props = {
    dropdown: any;
    wallet: any,
    openModal: any,
    setDropdown: any;
    showId: any;
    Wallet: any;
    txCount: any;
    min: any;
}






export default function DashboardTransactions({dropdown, wallet, openModal, setDropdown, showId, Wallet, txCount, min}: Props) {
    const [transactions_, settransaction_] = useState<any>();

    let init_tx_data : any = [];

    for (let i = 0; i < txCount; i++) {
      init_tx_data.push(
        {
          addressOrName: wallet,
          contractInterface: Wallet,
          functionName: 'transactions',
          args: [i]
        }
      )
    }

    const { data: initData, isError: initDataError, isLoading: initDataLoading } = useContractReads({
      contracts: init_tx_data,
    })


    console.log(initData)


  return (
    <>
      {
        initData && initData.map((tx: any, index) => {
          return (
            <>
            <div className="relative bg-base90 rounded-xl mt-10 mb-10">

              <div className="multi__single__proposal">
                <div className="multi__single__proposal__sectionOne">
                  <div className="multi__single__proposal__sectionOne_1">
                    <p className="l_1">{tx.topic}</p>
                    <p className="l_2">{tx.value.toString()} ETH</p>
                    <p className="l_3">{formatAddress(tx.to)}</p>
                  </div>
                  <div className="multi__single__proposal__sectionOne_2">{tx.numConfirmations.toString()}/{min}</div>
                </div>
                <div 
                className="count cursor-pointer multi__single__proposal__sectionTwo" 
                onClick={() => openModal(1)}
                >
                  <BiDotsVerticalRounded />
                </div>
              </div>

              {dropdown && (
                <ClickAwayListener onClickAway={() => setDropdown(false)}>
                  <div className="dropdown dropdown__transaction__proposal">
                    <p
                      className="text-lg details_container"
                      onClick={() => {
                        console.log(showId);
                        
                        // openPartnerDetailsModal(id);
                        // closeIcon();
                        
                      }}
                    >
                      Submit
                    </p>
                    <p className="text-lg details_container"
                    // onClick={() => { closeIcon(); }}
                    >
                      Confirm
                    </p>
                    <p className="text-lg details_container"
                    // onClick={() => { closeIcon(); }}
                    >
                      Execute
                    </p>
                    <p
                      className="text-lg details_container"
                      // onClick={() => { closeIcon(); }}
                    >
                        Revoke
                      </p>
                    
                  </div>
                </ClickAwayListener>
              )}
              </div>
            </>
          )
        })
      }
    </>
  )
}