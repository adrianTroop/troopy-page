import { ethers } from 'ethers'

export const loadProvider = (dispatch) => {
    //connecting ethers to the BC
    const connection = new ethers.providers.Web3Provider(window.ethereum)
    //In Js you dont need to put the type the language already know.
    dispatch({type:'PROVIDER_LOADED', connection})
    return connection
}

export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork()
    dispatch({ type: 'NETWORK_LOADED', chainId})

    return chainId
}


export const loadAccount = async (provider, dispatch) => {
    const accounts = await window.ethereum.request({method : 'eth_requestAccounts'})
    const account = ethers.utils.getAddress(accounts[0])
    
    dispatch({ type : 'ACCOUNT_LOADED', account })
    //Had to change this as i think i probably changed this when i updated the other funciton.
    let balance = await provider.getBalance(account)
    //this returns the gwei amount but we want to pass it as Ether amount.
    balance = ethers.utils.formatEther(balance)
    dispatch({ type : 'ETHER_BALANCE_LOADED', balance})

    return account
}