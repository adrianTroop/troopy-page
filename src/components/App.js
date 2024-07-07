import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import config from '../config.json';
import '../App.css';

import { loadNetwork, loadProvider, loadAccount } from '../store/interactions';

import Navbar from './NavBar';
import Lottery from './Lottery';

function App() {
  const dispatch = useDispatch()
  
  const loadBlockChainData = async () => {
  
    const provider = loadProvider(dispatch)
    const { chainId }  = await loadNetwork(provider, dispatch)
    const account = await loadAccount(provider, dispatch)
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

