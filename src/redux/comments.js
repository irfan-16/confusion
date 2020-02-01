import {COMMENTS} from "../shared/comments";
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    //if the type of an action maches 'case' then 
    //'case' function is supposed to do sth 
    switch (action.type) {
        case ActionTypes.ADD_COMMENT: 
            var comment= action.payload;
            comment.id =state.length;
            comment.date = new Date().toISOString();
            //we use concat not to directly mutate the state
            // pushes data into a new array object
            return state.concat(comment);
        default:
            return state;
    }
}