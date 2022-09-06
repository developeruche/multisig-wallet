import React, { Fragment, useEffect } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { FaDollarSign } from 'react-icons/fa';
import { BsBriefcase } from 'react-icons/bs';
import ActionButton from "./../components/core/ActionBtn";
import AOS from "aos";


interface WhatWeDoProps {

}

const WhatWeDo: React.FC<WhatWeDoProps>= () => {
  const handleCreateWallet = () => {
    alert("My duty is to Create Wallet")
  }

  const handleLogin = () => {
    alert("My duty is to Login")
  }

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  
  return (
    <Fragment>
      <div className='bg-base70 text-white py-24 px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 grid-flow-row md:grid-flow-col gap-12'>
      {/* <div className='bg-base70 text-white py-10 px-6 md:px-12 lg:px-24 
        flex md:flex-row flex-col
      '> */}
        <div 
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className='flex flex-col'>
          <div className='flex justify-center'>
            <IoIosPeople size={"64px"} className='' />

          </div>
          <p className='text-center mt-3 text-xl what__do__we__do'>
            Requiring signatures from at least M of N total signers to execute the action. More generally, it is a type of decentralized governance.  
          </p>
        </div>

        <div 
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1800"
          className='flex justify-center flex-col mt-12 md:mt-0'>
          <div className='flex justify-center'>
            <FaDollarSign size={"50px"} className='' />
          </div>
          <p className='text-center mt-3 text-xl what__do__we__do'>
            Allows people to trade directly with each other, using a record of transactions kept in a shared ledger. Eliminates the need for middlemen, like stock exchanges and banks.  
          </p>
        </div>

        <div 
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2500"
          className='flex justify-center flex-col mt-12 md:mt-0'>
          <div className='flex justify-center'>
            <BsBriefcase size={"64px"} className='' />
          </div>
          <p className='text-center mt-3 text-xl what__do__we__do'>Holding private keys in different locations enhances security, while allowing multiple keys to sign a transaction improves usability. If one of the keys is compromised, your assets are still secure.</p>
        </div>
      </div>
    </Fragment>
  )
}

export default WhatWeDo;