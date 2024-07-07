//Top of the page where the user would link up his wallet to be able to participate in this.
import { useSelector, useDispatch } from "react-redux"
import { loadAccount, loadNetwork } from "../store/interactions"
import  config  from '../config.json'

const Navbar = () => {
    //Connect Account
    const provider = useSelector(state => state.provider.connection)
    const chainId = useSelector(state => state.provider.chainId)
    const account = useSelector(state => state.provider.account)
    const balance = useSelector(state => state.provider.balance)

    const dispatch = useDispatch()

    const connectHandler = async () => {
        if(provider) {
            await loadAccount(provider, dispatch)
        }        
    }

    return(
        <div className='exchange__header--account flex'>{ balance ? (
            <p><small> My balance </small> { Number(balance).toFixed(4) } {chainId} </p>
            ) : (
            <p>Connect your wallet</p>
            )}
        <button className="token-button" onClick={ connectHandler }>
            { account ? ( 
                <label> {(account.slice(0,5) + '...' + account.slice(-4)) } </label>
                ) : (
                <label> Connect </label>
                )}
            </button>
        </div>
    );
}

export default Navbar;

