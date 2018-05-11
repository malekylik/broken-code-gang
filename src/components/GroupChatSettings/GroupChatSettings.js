import React, { Component } from 'react';
import { UserList } from '../UserList/UserList';
import { LinkBtn } from '../Buttons/LinkBtn/LinkBtn';
import './GroupChatSettings.css';
import { ConnectedHeader } from '../Header/Header';
import { connect } from 'react-redux';
import leaveRoom from '../../actions/leaveRoom';
import routeNavigation from '../../actions/route';
import api from '../../api';
import makeCancelable from '../../helpers/cancelablePromise';

const stateToProps = state => ({
    chatInfo: state.route.payload,
    users: state.users.items,
    next: state.users.next,
});

class GroupChatSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatName: props.chatInfo.chatName,
            loading: false,
        };

        this.updateSetting = {};

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.onClickAddNewUser = this.addNewUserToChat.bind(this);
        this.onClickExit = this.removeUserFromChat.bind(this);
    }

    inputChangeHandler(e) {
        if (e.target.name === 'name') {
            this.setState({ chatName: e.target.value });
        }

        this.updateSetting[e.target.name] = e.target.value;
    }

    submitHandle(e) {
        e.preventDefault();
    
        this.setState({ loading: true });

        this.didMountFetch = makeCancelable(api.updateRoom(this.props.chatInfo.currentRoom, this.updateSetting));

        this.didMountFetch.promise
        .then(() => {
            this.setState({ loading: false });
            this.updateSetting = {};
        });
    }

    componentWillUnmount() {
        if (this.didMountFetch) {
            this.didMountFetch.cancel();
        }
    }

    addNewUserToChat() {
        this.props.dispatch(routeNavigation({
            page: 'add_new_user_to_chat_page',
            payload: {
                prevPage: 'chat_settings',
                prevPrevPage: this.props.chatInfo.prevPage,
                prevPrevPrevPage: this.props.chatInfo.prevPrevPage,
            }
        }));
    }

    removeUserFromChat() {
        this.props.dispatch(leaveRoom(this.props.chatInfo.currentRoom));
    }

    openUserMenu(contactId){
        /*Здесь меню действий над пользователем в групповом чате*/
    }

    render() {
        const membersQuan = this.props.chatInfo.chatUsers.length;

        return (
            <div className="GroupChatSettings">
                <section className="GroupChatSettings__section">
                    <div className="">
                        <ConnectedHeader contentTitle='BCG' contentDesc="" buttonBack buttonSearch={false}
                                         buttonSettings={false} contentType="chat"/>
                    </div>
                </section>
                <form onSubmit={this.submitHandle} className="GroupChatSettings__inputs">
                    <p className="GroupChatSettings__input">
                        <label htmlFor='chat-name'>Chat Name:</label>
                        <input id='chat-name' type='text' name='name' value={this.state.chatName} onChange={this.inputChangeHandler} />
                    </p>
                    {this.state.loading && (
                    <div className="spinner">
                        <div className="rect1" />
                        <div className="rect2" />
                        <div className="rect3" />
                        <div className="rect4" />
                        <div className="rect5" />
                    </div>
                )}
                    <input className="GroupChatSettings__save-button" value='Сохранить' type='submit' />
                </form>
                <section className="GroupChatSettings__section">
                    <h4 className="GroupChatSettings__section__title">Members ({membersQuan})</h4>
                    <LinkBtn className="GroupChatSettings__exit" btnText="Добавить участника"
                             onclick={this.onClickAddNewUser}/>
                    <UserList
                        users={this.props.chatInfo.chatUsers} handleClick={this.openUserMenu}
                    />
                </section>
                <section className="GroupChatSettings__section">
                    <LinkBtn className="GroupChatSettings__exit" btnText="Exit" onclick={this.onClickExit}/>
                </section>
            </div>
        );
    }
}

export const ConnectedGroupChatSettings = connect(stateToProps)(GroupChatSettings);
