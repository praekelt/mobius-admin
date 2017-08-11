import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser as getUserAction} from '../actions/getUserAction';
import restClient from '../rest/restClient';
import {GET} from '../rest/types';
import {showNotification} from 'admin-on-rest';

class WelcomeUser extends Component {
    componentWillMount() {
        restClient(GET, 'get-user')
            .then(data => data.result)
            .then(getUserAction) // dispatch action when the response is received
            .catch((e) => {
                console.error(e);
                showNotification('Error: comment not approved', 'warning')
            });
    }

    render() {
        debugger;
        const { user } = this.props;
        return <div>Current user logged in: { user }</div>
    }
}

WelcomeUser.propTypes = {
    getUser: PropTypes.func,
    user: PropTypes.number,
};

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps, {
    getUser: getUserAction,
})(WelcomeUser);
