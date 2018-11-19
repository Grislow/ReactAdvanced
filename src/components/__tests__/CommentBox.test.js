import React from 'react';
import { mount } from 'enzyme';

import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapped;

beforeEach(() => {
    wrapped = mount(
        <Root>
            <CommentBox />
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
});

//using the Full DOM renderer as an example - this could be done with shallow renderer
it('has a text area and two buttons', () => {
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
    beforeEach(() => {
        // 1 , 2
        wrapped.find('textarea').simulate('change', {
            // 3 - the 'change' event causes component to rerender
            target: { value: 'new comment' }
        });
        // 4 - has to be done through enzyme since component rerendering is asynchronous
        wrapped.update();
    });

    // Simulating events
    // 1. find the textarea element
    // 2. simulate a 'change' event
    // 3. provide a fake event object
    // 4. force the component to update
    // 5. assert that the textareas value has changed
    it('has a text area that can be typed in', () => {
        // 5
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    });

    it('form submitting empties text area', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    });
})

