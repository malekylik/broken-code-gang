import React, { Component } from 'react';
import { ConnectedHeader } from '../Header/Header';
import { UserList } from '../UserList/UserList';
import { connect } from 'react-redux';
import fetchUsers from '../../actions/fetchUsers';
import addUserToChat from '../../actions/addUserToChat';

const stateToProps = state => ({
    users: state.users.items,
    next: state.users.next,
    chatUsers: state.route.payload.chatUsers,
    currentRoom: state.route.payload.currentRoom,
    payload: state.route.payload,
});

export class AddUserToChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchTerm: '',
            displayedContacts: this.props.users
        };
        this.fetch = this.fetch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    fetch() {
        return this.props.dispatch(fetchUsers());
    }

    handleClick(contactId) {
        this.props.dispatch(addUserToChat(this.props.currentRoom, contactId));
    }

    handleSearch(event) {
        const searchQuery = event.target.value.toLowerCase();

        this.setState({
            searchTerm: searchQuery,
        });
    }

    resetSearch() {
        this.setState({
            searchTerm: '',
        });
    }

    render() {
        let displayedContacts = [];
        let searchQuery = this.state.searchTerm;

        if (searchQuery) {
            displayedContacts = this.props.users.filter(user => (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())));
        } else {
            displayedContacts = this.props.users;
        }

        this.props.chatUsers.forEach(user => {
            for (let i = 0; i < displayedContacts.length; i++) {
                if (user._id === displayedContacts[i]._id)
                    displayedContacts.splice(i, 1);
            }
        });

        return (
            <div className="AddUserToChatPage">
                <ConnectedHeader buttonBack={true} buttonSearch searchIsOn={searchQuery} resetSearch={this.resetSearch}
                                 handleSearch={this.handleSearch} buttonSettings={false} contentType="contacts"/>
                <UserList
                    users={displayedContacts}
                    fetchNext={this.fetch}
                    next={this.props.next}
                    handleClick={this.handleClick}
                />
            </div>
        );
    }
}

export const ConnectedAddUserToChatPage = connect(stateToProps)(AddUserToChatPage);
