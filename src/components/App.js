import React from 'react';

import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

export default props => {
    return (
        <div>
            <CommentBox />
            <CommentList />
        </div>
    );
};

