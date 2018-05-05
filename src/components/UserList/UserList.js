import React, { Component } from 'react';
import { InstanceSummaryElement } from '../InstanceSummaryElement/InstanceSummaryElement';
import { InfiniteScroll } from '../InfiniteScroll/InfiniteScroll';
import './UserList.css';
import { connect } from 'react-redux';

const stateToProps = state => ({
    users: state.users.items,
    fetchNext: state.route.payload.fetchNext,
    next:state.users.next,
});



export class UserList extends Component {
    clickHandler(contactId) {
        this.props.handleClick(contactId);
    }
    
    render() {
        const { users, fetchNext, next } = this.props;
        const imgSrc = 'https://avatars.mds.yandex.net/get-pdb/1008348/cab77028-8042-4d20-b343-a1498455e4c8/s1200';
        let userListContent = '';
        if (users && users.length) {
            userListContent = users.map(contact => (
                <InstanceSummaryElement
                    key={contact._id}
                    summary={{
                        avatar: {
                            src: imgSrc,
                            modifier: 'avatar-s',
                        },
                        title: `${contact.name}`,
                        author: `${contact.online ? 'online' : ''}`,
                        id: `${contact._id}`,
                    }}
                    onclick={this.clickHandler.bind(this)}
                />));
        } else {
            userListContent = <div className="UserList__empty"><p>No contacts here yet...</p></div>;
        }

        return (
            <InfiniteScroll fetchNext={fetchNext} scrollDirection="down" next={next}>
                <div className="UserList">
                    {userListContent}
                </div>
            </InfiniteScroll>

        );
    }
}

export const ConnectedUserList = connect(stateToProps)(UserList);
