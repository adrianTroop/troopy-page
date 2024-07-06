import { useEffect, useInsertionEffect } from 'react';
import { ethers } from 'ethers';
import config from '../config.json';
import '../App.css';

import Navbar from './NavBar';
import Lottery from './Lottery';

function App() {
  //const dispatch = useDispatch()
  
  const loadBlockChainData = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
    console.log(accounts[0])

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { chainId } = await provider.getNetwork()
    console.log(chainId)
  }

  useEffect(()=>{
    loadBlockChainData();
  })

  return (
    <div>
      <Navbar/>
      <main>
          < Lottery />
      </main>
    </div>
  );
}

export default App;

