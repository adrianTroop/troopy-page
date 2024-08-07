import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//This is what allows the chrome extension to collect the info
import { composeWithDevTools  } from 'redux-devtools-extension';
import { lotteryContract, provider, tokens } from './reducers'; 

const reducer = combineReducers({
    provider,
    tokens,
    lotteryContract
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
