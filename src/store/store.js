import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming you will create this file next

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;