import type { NextPage } from "next";
import Layout from "../components/globals/Layout";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillCopy, AiOutlineCopy, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NewProposalMd, NewProposalSm } from "../components/core/NewProposal";
import { BiDotsVerticalRounded } from "react-icons/bi"
import ClickAwayListener from 'react-click-away-listener';

const formatAddress = (address: any) => {
  return address?.substring(0, 6) + "..." + address?.slice(0, 4);
};

const Dashboard: NextPage = () => {
  const [copy, setCopy] = useState<boolean>(false);
  const [isNewProposalMd, setIsNewProposalMd] = useState<boolean>(false);
  const [isNewProposalSm, setIsNewProposalSm] = useState<boolean>(false);


  const [dropdown, setDropdown] = useState<boolean>(false);
  const [showId, setShowId] = useState<string | number>("");



  let wallet: string = "0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7";
  let owners: Array<any> = [
    "0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7",
    "0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7",
    "0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7",
  ];

  const openModal = (id: string | number) => {
    setDropdown(true);
    setShowId(id)
  }

  useEffect(() => {
    if(copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000)
    }
  }, [copy])
  

  return (
    <div>
      <Layout>
        <div className="px-6 md:px-12 lg:px-24 text-white mt-8 proposal__dashboard">
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="text-2xl proposal__dashboard__address__title">Owners: </span>
              {owners.map((addr, index) => (
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

          <div className="relative h-[50vh] bg-base90 rounded-xl mt-12 mb-18">

            <div className="multi__single__proposal">
              <div className="multi__single__proposal__sectionOne">
                <div className="multi__single__proposal__sectionOne_1">
                  <p className="l_1">Money for Mr Israel</p>
                  <p className="l_2">{"30"} ETH</p>
                  <p className="l_3">{formatAddress(wallet)}</p>
                </div>
                <div className="multi__single__proposal__sectionOne_2">1/3</div>
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
        </div>
      </Layout>



      <NewProposalMd
        setIsNewProposalMd={setIsNewProposalMd}
        isNewProposalMd={isNewProposalMd}
      />

      <NewProposalSm
        isNewProposalSm={isNewProposalSm}
        setIsNewProposalSm={setIsNewProposalSm}
      />
    </div>
  );
};

export default Dashboard;
