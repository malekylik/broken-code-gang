import * as React from 'react';
import { connect } from 'react-redux';
import './ChatListPage.css';
import { ConnectedHeader } from '../Header/Header';
import { ChatList } from '../ChatList/ChatList';
import { FooterNav } from '../FooterNav/FooterNav';
import fetchRooms from '../../actions/fetchRooms';
import routeNavigation from '../../actions/route';
import makeCancelable from '../../helpers/cancelablePromise';

const stateToProps = state => ({
    items: state.rooms.items,
    next: state.rooms.next,
    end: state.rooms.end,
    error: state.rooms.error,
    payload: state.route.payload,
    user: state.user,
    page: state.route.page,
});

export const ChatListPage = connect(stateToProps)(class ChatListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            addRoomVisible: false,
        };
        this.fetch = this.fetch.bind(this);
        this.submitHandler = this.submitHandler.bind(this); 
    }

    componentDidMount() {
        this.props.dispatch(
            {
                type: 'ROOMS_RESET',
            });

        this.didMountFetch = makeCancelable(this.fetch());

        this.didMountFetch.promise
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((error) => {
                if (error.isCanceled === undefined) {
                    console.log(error);
                }
            });
    }

    componentWillUnmount() {
        if (this.didMountFetch) {
            this.didMountFetch.cancel();
        }
    }

    fetch() {
        return this.props.dispatch(fetchRooms());
    }

    submitHandler() {
        this.props.dispatch(routeNavigation({
            page: 'add_room_page',
            payload: {
                ...this.props.payload,
                prevPage: 'chat_list',
            },
        }));
    }

    render() {
        return (
            <div className="ChatListPage">
                <ConnectedHeader buttonBack={false} buttonSearch={false} buttonSettings={false} contentType="chats" />
                {this.state.loading && (
                    <div className="spinner">
                        <div className="rect1" />
                        <div className="rect2" />
                        <div className="rect3" />
                        <div className="rect4" />
                        <div className="rect5" />
                    </div>
                )}
                {this.state.error && (
                    <div>
                        Something is BROKEN!!!
                        <p>{this.state.error.message}</p>
                    </div>
                )}
                <ChatList
                    rooms={this.props.items}
                    fetchNext={this.fetch}
                    next={this.props.next}
                />
                <FooterNav active={this.props.payload.footerNav.active} />
            </div>
        );
    }
});
