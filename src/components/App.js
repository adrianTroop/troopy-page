import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { ethers } from 'ethers';
import config from '../config.json';
import '../App.css';

import { loadNetwork,
         loadProvider,
         loadAccount,
         loadTokens } from '../store/interactions';

import Navbar from './NavBar';
import Lottery from './Lottery';

function App() {
  const dispatch = useDispatch()
  
  const loadBlockChainData = async () => {
    const provider = loadProvider(dispatch)
    const { chainId }  = await loadNetwork(provider, dispatch)
    await loadAccount(provider, dispatch)
  
    window.ethereum.on('chainChanged', ()=>{
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', () => {
      loadAccount(provider, dispatch)
    })

    const mhi = config[chainId].mhi.address
    await loadTokens(provider, mhi, dispatch)
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

