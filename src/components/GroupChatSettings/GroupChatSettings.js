import React, { Component } from 'react';
import { UserList } from '../UserList/UserList';
import { LinkBtn } from '../Buttons/LinkBtn/LinkBtn';
import './GroupChatSettings.css';
import { ConnectedHeader } from '../Header/Header';
import { connect } from 'react-redux';
import leaveRoom from '../../actions/leaveRoom';
import routeNavigation from '../../actions/route';
import fetchUsers from '../../actions/fetchUsers';
import api from '../../api';

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
        };

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
    }

    inputChangeHandler(e) {
        this.setState({ chatName: e.target.value });
    }

    submitHandle(e) {
        e.preventDefault();
    
        api.updateRoom(this.props.chatInfo.currentRoom, { name: this.state.chatName });
    }

    render() {
        console.dir(this.props);

        return (
            <div className="GroupChatSettings">
                <section className="GroupChatSettings__section">
                    <div className="">
                        <ConnectedHeader contentTitle='BCG' contentDesc="" buttonBack buttonSearch={false}
                                         buttonSettings={false} contentType="chat"/>
                    </div>
                </section>
                <form onSubmit={this.submitHandle} className="GroupChatSettings__inputs">
                    <label htmlFor='chat-name'>Chat Name:</label>
                    <input id='chat-name' type='text' value={this.state.chatName} onChange={this.inputChangeHandler} />
                    <input type='submit' />
                </form>
                {/* <section className="GroupChatSettings__section">
                    <h4 className="GroupChatSettings__section__title">Members ({membersQuan})</h4>
                    <LinkBtn className="GroupChatSettings__exit" btnText="Добавить участника"
                             onclick={onClickAddNewUser}/>
                    <UserList
                        users={props.payload.chatUsers} handleClick={handleClick}
                    />
                </section>
                <section className="GroupChatSettings__section">
                    <LinkBtn className="GroupChatSettings__exit" btnText="Exit" onclick={onClickExit}/>
                </section> */}
            </div>
        );
    }
}


// export const GroupChatSettings = connect(stateToProps)(
//     (props, dispatch) => {
//         const membersQuan = props.payload.chatUsers.length,
//             groupName = 'BCG',
//             onClickExit = removeUserFromChat.bind(props),
//             fetchNext = props.dispatch.bind(props, fetchUsers()),
//             onClickAddNewUser = addNewUserToChat.bind(props, fetchNext),
//             handleClick = openUserMenu.bind(props);

//         return (
//             <div className="GroupChatSettings">
//                 <section className="GroupChatSettings__section">
//                     <div className="">
//                         <ConnectedHeader contentTitle={groupName} contentDesc="" buttonBack buttonSearch={false}
//                                          buttonSettings={false} contentType="chat"/>
//                     </div>
//                 </section>
//                 <form onSubmit={submitHandle} className="GroupChatSettings__inputs">
//                     <input type='text' />
//                     <input type='submit' />
//                 </form>
//                 <section className="GroupChatSettings__section">
//                     <h4 className="GroupChatSettings__section__title">Members ({membersQuan})</h4>
//                     <LinkBtn className="GroupChatSettings__exit" btnText="Добавить участника"
//                              onclick={onClickAddNewUser}/>
//                     <UserList
//                         users={props.payload.chatUsers} handleClick={handleClick}
//                     />
//                 </section>
//                 <section className="GroupChatSettings__section">
//                     <LinkBtn className="GroupChatSettings__exit" btnText="Exit" onclick={onClickExit}/>
//                 </section>
//             </div>
//         );
//     });

function removeUserFromChat() {
    this.dispatch(leaveRoom(this.payload.currentRoom));
}

function addNewUserToChat() {
    this.dispatch(routeNavigation({
        page: 'add_new_user_to_chat_page',
        payload: {
            prevPage: 'chat_settings',
            prevPrevPage: this.payload.prevPage,
            prevPrevPrevPage: this.payload.prevPrevPage,
        }
    }));
}



function openUserMenu(contactId){
    /*Здесь меню действий над пользователем в групповом чате*/
}

export const ConnectedGroupChatSettings = connect(stateToProps)(GroupChatSettings);
