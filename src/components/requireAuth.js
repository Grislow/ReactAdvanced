import React from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends React.Component {

        componentDidMount() {
            this.shouldNavAway();
        }

        componentDidUpdate() {
            this.shouldNavAway();
        }

        shouldNavAway() {
            if(!this.props.auth) {
                this.props.history.push('/');
            }
        }

        render() {
            // passing down props from HOC to child component
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps (state) {
        return {
            auth: state.auth
        };
    }

    return connect(mapStateToProps)(ComposedComponent);
};

