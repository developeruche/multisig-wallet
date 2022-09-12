import type { NextPage } from 'next';
import Layout from '../components/globals/Layout';
import HeroSection from '../components/HeroSection';
import WhatWeDo from '../components/WhatWeDo';
import {getWalletAddress} from "../components/globals/actions";
import { useEffect, useState } from 'react';
import router from "next/router";
import Head from "next/head";

const Home: NextPage = () => {
  const [address, setAddress] = useState<any>();
  // const getAddress = async () => {
  //   const addr = await getWalletAddress();
  //   setAddress(addr);
  // }

  // useEffect(() => {
  //   getAddress();
  // }, []);


  // if(address != null) {
  //   router.push("/dashboard")
  //   console.log("PASSED ====>")
  // }

  // console.log(address, "ADDRESS");

  return (
    <div>
      <Head>
        <title>Consense | Home</title>
      </Head>
      <Layout>
        <HeroSection />

        <WhatWeDo />
      </Layout>
    </div>
  )
}

export default Home
