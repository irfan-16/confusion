import {createStore, combineReducers, applyMiddleware} from 'redux'; //to allow creaate Redux Store
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Dishes} from './dishes'; //to configure aur store
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store=createStore( //requires parameters Reducer
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            promotions:Promotions,
            leaders:Leaders,
            ...createForms({
                feedback: InitialFeedback,
            })
        }),
        applyMiddleware(thunk)
    );

    return store;
}
