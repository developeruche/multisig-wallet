import React, { Fragment, useEffect, useState } from 'react';
import ActionButton from "./../components/core/ActionBtn";
import {CreateWalletMd, CreateWalletSm} from './core/CreateWallet';
import AOS from "aos";

interface HeroSectionProps {

}

const HeroSection: React.FC<HeroSectionProps>= () => {
  const [isCreateWalletMd, setIsCreateWalletMd] = useState<boolean>(false);
  const [isCreateWalletSm, setIsCreateWalletSm] = useState<boolean>(false);

  const handleLogin = () => {
    alert("My duty is to Login")
  }



    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
  
  return (
    <Fragment>

      <div className="bg-primary text-white px-6 md:px-12 lg:px-24 
      flex lg:flex-row flex-col pb-12">
        <div className="flex-1">
          <h2 className='text-6xl md:text-8xl mt-12 leading-tight banner__lead'>Consense <br /> MultiSig Wallet</h2>

          <p className='mt-10 text-2xl banner__small__lead'>A digital signature wallet that makes it possible for two or more users to sign documents as a group</p>

          <div className="flex mt-16">
            <ActionButton  classprops='hidden md:block' title="Create Wallet" setAction={() => setIsCreateWalletMd(true)} />
            <ActionButton  classprops='md:hidden' title="Create Wallet" setAction={() => setIsCreateWalletSm(true)} />

            <ActionButton classprops='ml-8 py-5' title="Login Wallet" setAction={handleLogin} />
          </div>
        </div>

        <div className="mt-7 flex-1">
          <div className="banner__img__section__one banner__img__section">
            <img
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
              src="/m2.jpg" style={{height: "auto", width: "100%"}}
              alt="multisig"
            />
          </div>
          <div className="banner__img__section__two">
            <img
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
              src="/m1.jpg"
              alt="multisig"
            />
            <img
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1100"
              src="/m3.jpg"
              alt="multisig"
            />
          </div>
        </div>
      </div>

      <CreateWalletMd 
        setIsCreateWalletMd={setIsCreateWalletMd}
        isCreateWalletMd={isCreateWalletMd}
      />

      <CreateWalletSm
        setIsCreateWalletSm={setIsCreateWalletSm}
        isCreateWalletSm={isCreateWalletSm}
      />
    </Fragment>
  )
}

export default HeroSection;