import * as React from 'react';
import { connect } from 'react-redux';
import './AddRoomPage.css';
import { ConnectedHeader } from '../Header/Header';
import fetchUsers from '../../actions/fetchUsers';
import { InfiniteRooms } from '../InfiniteRooms/InfiniteRooms';
import addRoom from '../../actions/rooms';
import routeNavigation from '../../actions/route';

const stateToProps = state => ({
    items: state.users.items,
    next: state.users.next,
    end: state.users.end,
    newRoom: state.rooms.newRoom,
});

export const AddRoomPage = connect(stateToProps)(class AddRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        this.fetch = this.fetch.bind(this);
        this.addRoomHandle = this.addRoomHandle.bind(this);
        this.mas = [];
    }
    componentDidMount() {
        this.props.dispatch(
            {
                type: 'USERS_RESET',
            });
        this.fetch()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error,
                });
            });
    }

    addRoomHandle() {
        const namePoom = document.getElementById('Room-name').value;
        return this.props.dispatch(addRoom({ name: namePoom }, this.mas));
    }

    componentWillReceiveProps(props) {
        if (props.newRoom && (!this.props.newRoom || props.newRoom._id !== this.props.newRoom._id)) {
            this.enterRoom(props.newRoom._id);
        }
    }

    enterRoom = (roomId) => {
        this.props.dispatch(routeNavigation({
            page: 'chat_page',
            payload: {
                ...this.props.payload,
                currentRoom: roomId,
                prevPage: 'contacts_list'
            },
        }));
    };


    fetch() {
        return this.props.dispatch(fetchUsers());
    }

    render() {
        const listUses = this.props.items.map(el => (
            <div className="UsersList__ListElement" key={el._id}>
                <div className="ListElement__Photo">
                    <img
                        src="https://avatars.mds.yandex.net/get-pdb/1008348/cab77028-8042-4d20-b343-a1498455e4c8/s1200"
                        alt={el.name}
                    />
                </div>
                <div className="ListElement__Desc">
                    <p
                        className="Desc__Name"
                    >
                        {el.name}
                        <input
                            type="checkbox"
                            onClick={(e) => {
                                if (e.target.checked) {
                                    this.mas.push(el._id);
                                } else {
                                    this.mas.splice(this.mas.indexOf(el.id), 1);
                                }
                            }}
                        />
                    </p>
                    <p className="Desc__Status">{el.online && 'online'}</p>
                </div>
            </div>
        ));
        return (
            <div className="AddRoomPage">
                <ConnectedHeader buttonBack buttonSearch={false} buttonSettings={false} contentType="add-room" />
                <div
                    className="AddForm_InputField"
                >
                    <input
                        type="text"
                        id="Room-name"
                        className="InputField_Name"
                        placeholder="Введите название беседы"
                    />
                    <p>
                        <button
                            className="InputField_Accept"
                            onClick={this.addRoomHandle}
                        >
                                OK
                        </button>
                    </p>
                </div>
                <InfiniteRooms fetchNext={this.fetch} next={this.props.next}>
                    {this.state.loading && (
                        <div className="spinner">
                            <div className="rect1" />
                            <div className="rect2" />
                            <div className="rect3" />
                            <div className="rect4" />
                            <div className="rect5" />
                        </div>
                    )}
                    {listUses}
                </InfiniteRooms>
            </div>
        );
    }
});

