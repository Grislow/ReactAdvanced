import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';
import * as actions from 'actions';
 
class App extends React.Component  {
    
    renderButton() {
        // note: if else is faster then ternary operator
        return (this.props.auth)
            ? (
                <button 
                    onClick={ () => this.props.changeAuth(false) }
                >
                    Sign Out
                </button> 
            ) : (
                <button
                    onClick={ () => this.props.changeAuth(true)}
                >
                    Sign In
                </button>
            );
    }

    renderHeader(){
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/post">Post A Comment</Link>
                </li>
                <li>{this.renderButton()}</li>
            </ul>
        );
    }

    render(){
        return (
            <div>
                { this.renderHeader() }
                {/* exact -> must be '/' to render, not '/whatever' */}
                <Route path="/" exact component={CommentList} />
                <Route path="/post" component={CommentBox} />
            </div>
        );
    }
};

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(App);