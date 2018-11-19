import commentsReducer from 'reducers/comments';
import { SAVE_COMMENT } from "actions/types";

it('handles actions with a type of SAVE_COMMENT', () => {
    // create an action
    const action = {
        type: SAVE_COMMENT,
        payload: 'New Comment'
    };

    // assign reducer to a variable
    const newState = commentsReducer([], action);

    expect(newState).toEqual(['New Comment']);
});

it('handles action with unknown type', () => {
    const newState = commentsReducer([], { type: ''});

    expect(newState).toEqual([]);
});