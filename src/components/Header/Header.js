import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import { HeaderCenterItems } from '../HeaderCenterItems/HeaderCenterItems';
import { Button } from '../Button/Button';
import { routeNavigation } from '../../actions/route';

const stateToProps = state => ({
    payload: state.route.payload,
    page: state.route.page,
});

export default class Header extends Component {
    goBack() {
        const payload = this.props.payload;
        if (!payload || !payload.prevPage || payload.prevPage === 'authorization') {
            return null;
        }
        const curPage = this.props.page;
        const prevPage = this.props.payload.prevPage;
        this.props.dispatch(routeNavigation({
            page: prevPage,
            payload: {
                ...this.props.payload,
                prevPage: '',
            },
        }));
    }

    render() {
        const {
            buttonBack,
            buttonSearch,
            buttonSettings,
            contentType,
        } = this.props;
        const btnFillerStyle = { width: '30px', height: '30px' };
        const btnFiller = <div style={btnFillerStyle}>&nbsp;</div>;
        const leftControl = buttonBack ? <Button type="back" active modifier="s" circle onClick={this.goBack.bind(this)} >''</Button> : btnFiller;
        let rightControl = '';
        if (buttonSearch) {
            rightControl = <Button type="search" active modifier="s" circle />;
        } else if (buttonSettings) {
            rightControl = <Button type="settings" active modifier="s" circle />;
        }
        let contentTitle = '';
        let contentDesc = '';
        switch (contentType) {
        case 'chats':
            contentTitle = 'BCG';
            break;
        case 'add-room':
            contentTitle = 'Создать kомнату';
            break;
        case 'contacts':
            contentTitle = 'Contacts';
            break;
        case 'add-user':
            contentTitle = 'Select contact';
            break;
        case 'profile':
            contentTitle = 'User name';
            break;
        case 'chat':
            contentTitle = 'SHRI/ Anon';
            contentDesc = '9 members / last seen at';
            break;
        default:
            contentTitle = 'BCG';
            break;
        }

        return (
            <header className="Header">
                {leftControl}
                <HeaderCenterItems title={contentTitle} desc={contentDesc} />
                {rightControl}
            </header>
        );
    }
}

export const ConnectedHeader = connect(stateToProps)(Header);
