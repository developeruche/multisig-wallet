import React, { createRef, Dispatch, Fragment, SetStateAction, useState } from 'react';
import AppModal from './AppModal';
import BottomSheet from './BottomSheet';
import Select from 'react-select';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { Wallet } from '../globals/abi';
import { CHAIN_ID } from '../globals/actions';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import router from "next/router";



interface IAppModalMd {
  setIsNewProposalMd: Dispatch<SetStateAction<boolean>>, 
  isNewProposalMd: boolean,
  wallet: any,
}
interface IAppModalSm {
  setIsNewProposalSm: Dispatch<SetStateAction<boolean>>, 
  isNewProposalSm: boolean
}

const options = [
  { value: 'address', label: 'Address' },
  { value: 'uint256', label: 'Uint256' },
  { value: 'bytes', label: 'Bytes' },
  { value: 'bool', label: 'Boolean' },
];

function NewProposalMd({setIsNewProposalMd, isNewProposalMd, wallet}: IAppModalMd) {
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasTransactionData, setHasTransactionData] = useState<boolean>(true);

  const submitBtn = createRef<HTMLButtonElement>();


  const [proposalName, setProposalName] = useState<string>("")
  const [addressTo, setAddressTo] = useState<string>("")
  const [functionSigArgs, setFunctionSigArgs] = useState<string>("")
  const [valueOfEther, setValueOfEther] = useState<string>("")
  const [functionName, setFunctionName] = useState<string>("")
  const [functionData, setFunctionData] = useState("");










  const [selectList, setSelectList] = useState([{ address: "" }]);

  const handleSelectChange = (e: any, index:any) => {
    const { name, value } = e.target;
    const list: any = [...selectList];
    list[index][name] = value;
    setSelectList(list);
  };

  const handleSelectRemove = (index: any) => {
    const list = [...selectList];
    list.splice(index, 1);
    setSelectList(list);
  };

  const handleSelectAdd = () => {
    setSelectList([...selectList, { address: "" }]);
  };

  const prepFunctionData = () => {

  }

  const handleSuccessful = () => {
    toast.success('Proposal has been submitted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    router.reload();
  }



  const { data, write, isError, error } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: wallet,
    contractInterface: Wallet,
    functionName: 'submitTransaction',
    args: [addressTo, valueOfEther == "" ? ethers.utils.parseEther("0") : ethers.utils.parseEther(valueOfEther), hasTransactionData ? functionSigArgs : "", proposalName],
    chainId: CHAIN_ID,
    overrides: {
      value: valueOfEther == "" ? ethers.utils.parseEther("0") : ethers.utils.parseEther(valueOfEther),
    },
  });


  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const onTxCreated = () => {
    setIsNewProposalMd(false);
    setProposalName("");
    setAddressTo("");
    setFunctionData("");
    setFunctionName("");
    setFunctionSigArgs("");
    setValueOfEther("");

    toast.loading('Proposal is been submitted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    

    // let data;
    
    // hasTransactionData 
    //   ? data = {proposalName, addressTo, functionSigArgs, valueOfEther}
    //   : data = {proposalName, addressTo, functionData, valueOfEther}

    // Handling validation ==>
    if(proposalName=="") {
      toast.error('Proposal name is empty', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

        return;
    }
    if(addressTo=="") {
      toast.error('Address is empty', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

        return;
    }

    if(hasTransactionData) {
      if(functionSigArgs=="") {
        toast.error('Enter function signature', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
  
          return;
      }
    } else {
      if(functionData=="") {
        toast.error('Enter function data', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
  
          return;
      }
    }


    write();
    onTxCreated();

  };



  return (
    <div className=''>
      <AppModal>
        <AppModal.Cover isOpen={isNewProposalMd} setIsOpen={setIsNewProposalMd} variant={'md'}>
          <AppModal.Header
            showCloseBtn={true}
            heading={'New Proposal'}
            onClose={() => setIsNewProposalMd(false)}
          />

          <AppModal.Content variant={'lg'}>
            <div className="px-7 mt-8">
              <form onSubmit={handleSubmit}>
                {
                  hasTransactionData ? (
                    <Fragment>
                      <div className="grid grid-cols-2">
                        <div className="form-group mb-5">
                          <input
                            name="proposalName"
                            type="text"
                            id="name"
                            className='form-control'
                            placeholder='Proposal Name'
                            onChange={(e) => setProposalName(e.target.value)}
                          />
                        </div>

                        <div className="form-group mb-5 ml-4">
                          <input
                            name="addressTo"
                            type="text"
                            id="address"
                            className='form-control'
                            placeholder='Address To'
                            onChange={(e) => setAddressTo(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group mb-5">
                        <textarea
                          name="functionSigArgs"
                          id="address"
                          className='form-control form-textarea'
                          placeholder='Function Signature & Arguments'
                          onChange={(e) => setFunctionSigArgs(e.target.value)}
                          cols={30}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2">
                        <input
                          name="valueOfEther"
                          type="text"
                          id="valueOfEther"
                          className='form-control'
                          placeholder='Value Of Matic'
                          onChange={(e) => setValueOfEther(e.target.value)}
                        />
                      </div>

                        {/* <span className="">Warning: </span> */}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="grid grid-cols-2">
                        <div className="form-group mb-5">
                          <input
                            name="proposalName"
                            type="text"
                            id="name"
                            className='form-control'
                            placeholder='Proposal Name'
                            onChange={(e) => setProposalName(e.target.value)}
                          />
                        </div>

                        <div className="form-group mb-5 ml-4">
                          <input
                            name="addressTo"
                            type="text"
                            id="address"
                            className='form-control'
                            placeholder='Address To'
                            onChange={(e) => setAddressTo(e.target.value)}
                          />
                        </div>

                        <div className="form-group mb-5">
                          <input
                            name="functionName"
                            type="text"
                            id="functionName"
                            className='form-control'
                            placeholder='Function Name'
                            onChange={(e) => setFunctionName(e.target.value)}
                          />
                        </div>

                        <div className="form-group mb-5 ml-4">
                          <input
                            name="valueOfEther"
                            type="text"
                            id="valueOfEther"
                            className='form-control'
                            placeholder='Value Of Ether'
                            onChange={(e) => setValueOfEther(e.target.value)}
                          />
                        </div>



                        {selectList.map((singleselect, index) => (
                  <div key={index} className="services flex parameter__holders">
                    <div className="first-division mb-5">
                        
                        <div className="flex">
                          <Select
                            defaultValue={selectedOption}
                            //@ts-ignore
                            onChange={setSelectedOption}
                            options={options}
                          />

                          <div className="form-group ml-4">
                            <input
                              name="valueOfEther"
                              type="text"
                              id="valueOfEther"
                              className='form-control'
                              placeholder='Value Of Ether'
                              onChange={(e) => setValueOfEther(e.target.value)}
                            />
                          </div>
                        </div>



                      {selectList.length - 1 === index && selectList.length < 20 && (
                        <button
                          type="button"
                          onClick={handleSelectAdd}
                          className="add-btn add__Paramater__btn"
                        >
                          <span>Add Parameter</span>
                        </button>
                      )}
                    </div>
                    <div className="second-division">
                      {selectList.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleSelectRemove(index)}
                          className="remove-btn"
                        >
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                        
                      </div>

                        {/* <span className="">Warning: </span> */}
                    </Fragment>
                  )
                }


                  <button
                    ref={submitBtn}
                    type="submit"
                    className="hidden"
                  >
                    Add Unit
                  </button>

                   
              </form>

            </div>
          </AppModal.Content>

          <AppModal.Footer>
            <div className="flex justify-between add__address__footer">
              <div className="flex">
                <>{isSuccess && handleSuccessful()}</>
                <button
                  type={'button'}
                  onClick={() => setIsNewProposalMd(false)}
                  className="btn btn-outline-white h-auto pvy-12 pvx-16 mvr-24"
                >
                  Close
                </button>

                <button
                  type={'button'}
                  className={'ml-3'}
                  onClick={() => setHasTransactionData(!hasTransactionData)}
                >
                  {!hasTransactionData ? "does use tx data" : "use tx data"}
                </button>
              </div>

              <button
                type={'button'}
                onClick={() => submitBtn.current?.click()}
              >
                {isLoading ? "Transacting..." : "Transact"}
              </button>
              
            </div>
          </AppModal.Footer>
        </AppModal.Cover>
      </AppModal>
    </div>
  );
}


function NewProposalSm({setIsNewProposalSm, isNewProposalSm}: IAppModalSm) {

  return (
    <BottomSheet>
        <BottomSheet.Cover
          // heading={'Menu'}
          isOpen={isNewProposalSm}
          setIsOpen={setIsNewProposalSm}
          showCloseBtn={true}
          onClose={() => setIsNewProposalSm(false)}
        >
          <div className="py-12 px-7">
            <div>
              <form action="" className=''>
                <input type="text form-control" />
              </form>
            </div>
          </div>
          <div className="wf-100 py-12 px-7 fixed bottom-0 flex justify-between">
          <button
              className="bg-primary pdy-16 round-8 text-white wf-100 fs-16 lh-16 fw-normal mgt-20"
            >
              Close
            </button>
            <button
              className="bg-primary pdy-16 round-8 text-white wf-100 fs-16 lh-16 fw-normal mgt-20"
            >
              Create
            </button>
          </div>
        </BottomSheet.Cover>
      </BottomSheet>
  );
}


export { NewProposalMd, NewProposalSm };
