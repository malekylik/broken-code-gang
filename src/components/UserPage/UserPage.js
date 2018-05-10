import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedHeader } from '../Header/Header';
import { Avatar } from '../Avatar/Avatar';
import { FooterNav } from '../FooterNav/FooterNav';
import routeNavigation from '../../actions/route';
import leaveRooms from '../../actions/leaveRooms';
import api from '../../api';
import onAddUser from '../../helpers/onAddUser';
import onMessage from '../../helpers/onMessage';
import onCreateRoom from '../../helpers/onCreateRoom';

import './UserPage.css';

const stateToProps = state => ({
    payload: state.route.payload,
    curUserInfo: state.user.curUserInfo,
});

export class UserPage extends Component {
    constructor(props) {
        super(props)

        this.exitHandle = this.exitHandle.bind(this);
    }

    async exitHandle() {
        await api.logoutCurrentUser();
        await api.removeAddUser(onAddUser);
        await api.removeOnMessage(onMessage);
        await api.removeOnCreateRoom(onCreateRoom);
        await this.props.dispatch(routeNavigation(leaveRooms));

        this.props.dispatch(routeNavigation({ page: 'authorization' }));
    
    }

    render() {
        const userAvatar = {
            src: 'https://avatars.mds.yandex.net/get-pdb/1008348/cab77028-8042-4d20-b343-a1498455e4c8/s1200',
            modifier: 'avatar-m',
        };

        let name,
            phone = '';
        if (this.props.curUserInfo) {
            ({ name, phone } = this.props.curUserInfo);
        }

        return (
            <div className="UserPage">
                <ConnectedHeader buttonBack={false} contentType="settings" />
                <div className="UserPage__UserInfo">
                    <Avatar image={userAvatar} />
                    <h1 className="UserPage__UserName">
                        {name}
                    </h1>
                    <h4 className="UserPage__UserPhone">
                        {phone}
                    </h4>
                </div>
                <div className="UserPage__UserControls">
                    <button key="StarChar">
                        Начать чат
                    </button>
                    <button key="BlockUser">
                        Заблокировать пользователя
                    </button>
                    <button key="Exit" onClick={this.exitHandle}>
                        Выйти
                    </button>
                </div>
                <FooterNav active={this.props.payload.footerNav.active} />
            </div>
        );
    }
}
export const ConnectedUserPage = connect(stateToProps)(UserPage);
