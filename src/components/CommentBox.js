import React from 'react';
import { connect } from "react-redux";
import * as actions from 'actions';

class CommentBox extends React.Component {
    state = { comment: ''};

    handleChange = e => {
        this.setState({ comment: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        
        // TODO - Call an action creator and save the comment
        this.props.saveComment(this.state.comment);

        this.setState({ comment: ''});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Add a comment</h4>
                    <textarea 
                        value={this.state.comment} 
                        onChange={this.handleChange} 
                    />
                    <div>
                        <button>Submit Comment</button>
                    </div>
                </form>
                {/* this is possible because fetchComments is bound to props through connect()() */}
                <button 
                    className="fetch-comments"
                    onClick={this.props.fetchComments}
                >
                    Fetch Comments
                </button>
            </div>
        );
    }
} 

export default connect(null, actions)(CommentBox);