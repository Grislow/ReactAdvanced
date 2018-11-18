import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App';
import CommentBox from '../CommentBox';
import CommentList from '../CommentList';

// syntax
// -> it('description', () => { ..test logic... })
it('shows a comment box', () => {
    //creates fake div through JSDOM
    const div = document.createElement('div');

    //attempt to render App component within the JSDOM div
    ReactDOM.render(<App />, div);

    //check if CommentBox and CommentList exists in the div

    //clean up, unmounts components that are not used anymore
    ReactDOM.unmountComponentAtNode(div);
});