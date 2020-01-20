import {createStore} from 'redux'; //to allow creaate Redux Store
import {Reducer, initialState} from './reducer'; //to configure aur store


export const ConfigureStore = () => {
    const store=createStore( //requires parameters Reducer
        Reducer,
        initialState,
    );

    return store;
}
