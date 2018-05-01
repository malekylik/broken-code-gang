import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '../Button/Button';
import routeNavigation from '../../actions/route';
import './FooterNav.css';

export const FooterNav = connect()(class FooterNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: this.props.active,
        };

        this.changeNavHandler = this.changeNavHandler.bind(this);
    }

    changeNavHandler(type, e) {
        this.setState({ active: type });

        let page = type;

        if (page === 'chat') {
            page = 'chat_list';
        } else if (page === 'user') {
            page = 'contacts_list';
        }

        this.props.dispatch(routeNavigation({
            page,
            payload: {
                footerNav: {
                    active: type,
                },
            },
        }));
    }

    render() {
        return (
            <footer className="Footer Footer__nav">
                <Button type="chat" onClick={this.changeNavHandler} active={this.state.active === 'chat'} className="Footer__nav_btn" />
                <Button type="user" onClick={this.changeNavHandler} active={this.state.active === 'user'} className="Footer__nav_btn" />
                <Button type="settings" onClick={this.changeNavHandler} active={this.state.active === 'settings'} className="Footer__nav_btn" />
            </footer>
        );
    }
});
