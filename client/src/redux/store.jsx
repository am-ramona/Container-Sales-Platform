import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Reducer from "./reducer";
// import CartReducer from "./cartReducer";

// const appReducer = combineReducers({
//     Reducer,
//     cartReducer
// });

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;