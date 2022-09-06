import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AppModal from './AppModal';
import BottomSheet from './BottomSheet';
import {AiOutlineDelete} from "react-icons/ai";
import AOS from "aos";

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
                      />
                      {addressList.length - 1 === index && addressList.length < 20 && (
                      // <button onClick={handleAddressAdd} className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                      //   <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                      //   <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                      //   <span className="relative text-white">Add Address</span>
                      // </span>
                      // </button>
                      <button onClick={handleAddressAdd} className="add__address__btn">
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
                // onClick={() => submitBtn.current?.click()}
              >
                Save
              </button>
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
