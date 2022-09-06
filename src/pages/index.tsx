import type { NextPage } from 'next';
import Layout from '../components/globals/Layout';
import HeroSection from '../components/HeroSection';
import WhatWeDo from '../components/WhatWeDo';


const Home: NextPage = () => {

  return (
    <div>
      <Layout>
        <HeroSection />

        <WhatWeDo />
      </Layout>
    </div>
  )
}

export default Home
