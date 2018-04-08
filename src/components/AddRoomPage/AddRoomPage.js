import * as React from 'react';
import { connect } from 'react-redux';
import './AddRoomPage.css';
import Header from '../Header/Header';
import fetchUsers from '../../actions/fetchUsers';
import { InfiniteRooms } from '../InfiniteRooms/InfiniteRooms';
import addRoom from '../../actions/rooms';

const stateToProps = state => ({
    items: state.users.items,
    next: state.users.next,
    end: state.users.end,
});

export const AddRoomPage = connect(stateToProps)(
    class AddRoomPage extends React.Component {
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

        fetch() {
            return this.props.dispatch(fetchUsers());
        }

        render() {

            const listUses = this.props.items.map(el => (
                <div className="UsersList__ListElement">
                    <div className="ListElement__Photo">
                        <img
                            src="https://avatars.mds.yandex.net/get-pdb/1008348/cab77028-8042-4d20-b343-a1498455e4c8/s1200"
                            alt="Photo"
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
                                        this.mas.splice(this.mas.indexOf(el.id),1);
                                    }
                                }}
                            />
                        </p>
                        <p className="Desc__Status">{el.online ? 'online' : 'offline'}</p>
                    </div>
                </div>
            ));
            return (
                <div className="AddRoomPage">
                    <Header buttonBack buttonSearch buttonSettings={false} contentType="add-room" />
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
                        {listUses}
                    </InfiniteRooms>
                </div>
            );
        }
    });

