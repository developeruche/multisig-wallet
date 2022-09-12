import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AppModal from './AppModal';
import BottomSheet from './BottomSheet';
import {AiOutlineDelete} from "react-icons/ai";
import AOS from "aos";
import {CHAIN_ID, BANK_CONTRACT_ADDRESS, FACTORY_CONTRACT_ADDRESS, storeNewWalletAddress, getWalletAddress, storeConfirmation} from "../globals/actions"
import { toast } from 'react-toastify';
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  chain,
  useContractEvent
} from 'wagmi';
import {Factory} from "../globals/abi";
import router from "next/router";


interface IAppModalMd {
  setIsCreateWalletMd: Dispatch<SetStateAction<boolean>>, 
  isCreateWalletMd: boolean,
}
interface IAppModalSm {
  setIsCreateWalletSm: Dispatch<SetStateAction<boolean>>, 
  isCreateWalletSm: boolean
}

function CreateWalletMd({setIsCreateWalletMd, isCreateWalletMd}: IAppModalMd) {
  
  const [addressList, setAddressList] = useState([{ address: "" }]);
  const [minimunPermission, setMinimumPermission] = useState("");
  const [createWalletData, setCreateWalletData] = useState("");
  const { address } = useAccount()

  const storeAndRedirect = (address: string) => {
    storeNewWalletAddress(address);
    storeConfirmation(minimunPermission);
    router.push("/dashboard");
    console.log("working........")
  }

  useContractEvent({
    addressOrName: FACTORY_CONTRACT_ADDRESS,
    contractInterface: Factory,
    eventName: 'Cloned',
    listener: (event) => storeAndRedirect(event[1]),
    chainId: CHAIN_ID,
  })

  const handleAddressChange = (e: any, index:any) => {
    const { name, value } = e.target;
    const list: any = [...addressList];
    list[index][name] = value;
    setAddressList(list);
  };

  const handleAddressRemove = (index: any) => {
    const list = [...addressList];
    list.splice(index, 1);
    setAddressList(list);
  };

  const handleAddressAdd = () => {
    setAddressList([...addressList, { address: "" }]);
  };



  const { data, write, isError, error } = useContractWrite({
      mode: 'recklesslyUnprepared',
      addressOrName: FACTORY_CONTRACT_ADDRESS,
      contractInterface: Factory,
      functionName: 'clone',
      args: [addressList.map((addr) => addr.address), minimunPermission, BANK_CONTRACT_ADDRESS],
      chainId: CHAIN_ID
    });

  const { data: waitData, isError:waitError, isLoading:waitIsLoading } = useWaitForTransaction({
      hash: data?.hash,
  })

  const sunbmitCreateWallet = () => {
    if(address == undefined) {
      toast.error('You have not connected your wallet', {
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
    // @ts-ignore
    if(addressList.length < minimunPermission) {
      toast.error('Number of permission is very low', {
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

    if(addressList.length <= 1 || minimunPermission == "") {
      toast.error('Please enter address and minimum confirmation', {
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

    write();

    console.log(data)

    // if(waitData) {
    //   router.push("/dashboard")
    // }
  };

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const show__error = () => {
    toast.error(error?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }


  const show__succeess = () => {
    toast.success("Wallet successfully created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    // router.push("/dashboard");
  }



  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className=''>
      <AppModal>
        <AppModal.Cover isOpen={isCreateWalletMd} setIsOpen={setIsCreateWalletMd} variant={'sm'}>
          <AppModal.Header
            showCloseBtn={true}
            heading={'Create Wallet'}
            onClose={() => setIsCreateWalletMd(false)}
          />

          <AppModal.Content variant={'lg'}>
            <div className="px-3 mt-8">
              <form>
              <input
                        name="address"
                        type="number"
                        id="address"
                        className='form-control add__wallet__input'
                        value={minimunPermission}
                        onChange={(e) => setMinimumPermission(e.target.value)}
                        required
                        placeholder='Required amount of permission'
                      />
                {addressList.map((singleAddress, index) => (
                  <div key={index} className="services flex">
                    <div className="first-division">
                      <input
                        name="address"
                        type="text"
                        id="address"
                        className='form-control add__wallet__input'
                        value={singleAddress.address}
                        onChange={(e) => handleAddressChange(e, index)}
                        required
                        placeholder="Enter admin member's address"
                      />
                      {addressList.length - 1 === index && addressList.length < 20 && (
                      <button onClick={handleAddressAdd} type="submit" className="add__address__btn">
                        Add Address
                      </button>
                      )}
                    </div>
                    <div className="second-division">
                      {addressList.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleAddressRemove(index)}
                          className="remove-btn"
                        >
                          <AiOutlineDelete />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </form>

            </div>
          </AppModal.Content>

          <AppModal.Footer>
            <div className="flex justify-between add__address__footer">
              <button
                type={'button'}
                onClick={() => setIsCreateWalletMd(false)}
                className=""
              >
                Close 
              </button>

              <button
                type={'button'}

                disabled={!write}
                onClick={() => {sunbmitCreateWallet()}}
              >
                {isLoading ? 'Creating...' : 'Create Wallet'}
              </button>

              <>{isError && show__error()}</>                         
              <>{isSuccess && show__succeess()}</>                         
              {/* <>{isSuccess && console.log(waitData)}</> */}
            </div>
          </AppModal.Footer>
        </AppModal.Cover>
      </AppModal>
    </div>
  );
}


function CreateWalletSm({setIsCreateWalletSm, isCreateWalletSm}: IAppModalSm) {

  return (
    <BottomSheet>
        <BottomSheet.Cover
          // heading={'Menu'}
          isOpen={isCreateWalletSm}
          setIsOpen={setIsCreateWalletSm}
          showCloseBtn={true}
          onClose={() => setIsCreateWalletSm(false)}
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


export { CreateWalletMd, CreateWalletSm };
