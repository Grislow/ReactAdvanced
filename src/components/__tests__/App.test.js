import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

let wrapped;

//is executed before each test
beforeEach(() => {
    // wrapped - component that has aditional functionality loaded on top
    // name is arbitrary
    wrapped = shallow(<App />);
});

it('shows a comment box', () => {
    // find(comp) - returns array of all found instances of comp components
    expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('shows a comment list', () => {
    expect(wrapped.find(CommentList).length).toEqual(1);
})