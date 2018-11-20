// dispatch = takes action, forwards it to middleware stack and then forwards it to all reducers
// next = reference to next middleware on our chain
// action = action returned by action creator
export default ({ dispatch }) => next => action => {
    // Check to see if action has promise
    // If it doesnt, send action to next middleware  
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    // Wait for promise to resolve
    // get its data
    // create new action with data
    // dispatch it
    action.payload.then(function(response) {
        const newAction = { ...action, payload: response };
        dispatch(newAction);
    });
};
    
