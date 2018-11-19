import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from 'redux-promise';
import reducers from "reducers";

//2nd argument for createStore is an initial state
export default ({ children, initialState={} }) => {
    const store = createStore(
        reducers, 
        initialState, 
        applyMiddleware(reduxPromise)
    );
    
    return (
        <Provider store={ store }>
            {children}
        </Provider>
    );
};