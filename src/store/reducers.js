//handles it all thec onnection info

export const provider = (state = {} , action) =>{
    switch(action.type){
        case 'PROVIDER_LOADED':
            return{
                //check current state but dont modify it YOU Just have to update it
                ...state,
                //Add the connection from the action to the connection
                connection: action.connection
            }
        case 'NETWORK_LOADED':
            return {
                ...state,
                chainId: action.chainId
            }
        case 'ACCOUNT_LOADED':
            return {
                ...state,
                account: action.account
            }
        case 'ETHER_BALANCE_LOADED':
            return {
                ...state,
                balance: action.balance
            }

        default:
            return state 
    }
}
const DEFAULT_TOKENS_STATE = {
    loaded: false,
    contracts:[],
    symbols: [] 
}
//handles all the changes with Tokens
export const tokens = (state = DEFAULT_TOKENS_STATE , action) =>{
    switch(action.type){
        case 'TOKEN_1_LOADED':
            return{
                ...state,
                loaded:true,
                contracts: [action.token],
                symbols: [action.symbol]
            } 
        case 'TOKEN_1_BALANCE_LOADED':
            return{
                ...state,
                //Override current balance
                balances: [action.balance]
            }
        default:
            return state
        }
}

export const lotteryContract = (state = {}, action) => {
    switch(action.type){
        case 'TRANSFER_SUCCESS':
            return{
                ...state,
                transaction: { 
                    transactionType: 'Transfer',
                    isPending: false,
                    isSuccesful: true
                },
                transferInProgress: false,
                events: [action.event, ...state.events]
            }
        case 'TRANSFER_FAIL':
            return{
                ...state,
                transaction: { 
                    transactionType: 'Transfer',
                    isPending: false,
                    isSuccesful: false,
                    isError: true
                },
                transferInProgress: false
            }
        default:
            return state
    }
}
