import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import Root from 'Root';
import App from 'components/App';


beforeEach(() => {
    // setups moxios to intercept any axios requests
    moxios.install();

    // specify url of api call and options for how moxios responds to that request
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [{name: 'Fetch #1'}, {name: 'Fetch #2'}]
    });
});

afterEach(() => {
    // removes the stubRequest and uninstalls moxios
    moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
    // Attempt to render the *entire* app
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    );

    // find the 'fetchComments' button and click it 
    wrapped.find('.fetch-comments').simulate('click');

    // Introduce delay to give promise time to resolve
    //  -use moxios wait() -> more precise then setTimeout
    // Expect to find a list of comments!
    moxios.wait(() => {
        wrapped.update();

        expect(wrapped.find('li').length).toEqual(2);

        done();
        wrapped.unmount();
    });
});