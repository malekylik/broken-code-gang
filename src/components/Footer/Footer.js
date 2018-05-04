import React, { Component } from 'react';
import { connect } from 'react-redux';
import sendMessage from '../../actions/sendMessage';
import './Footer.css';

const stateToProps = state => ({
    payload: state.route.payload
});

const ENTER_KEY = 13;

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ messageText: e.target.value });
    }

    handleEmodgy(){

    }

    handleSubmit(e) {
        if ((e.which === ENTER_KEY && (e.ctrlKey || e.metaKey)) || e.type === 'click') {
            const roomId = this.props.payload.currentRoom;
            const currentMessage = this.state.messageText;
            this.setState({
                messageText: '',
            });
            this.props.dispatch(sendMessage(roomId, currentMessage));
        }
    };

    render() {
        return (
          <footer className="Footer Footer_TextField">
              <textarea
                    className="Footer__TextArea"
                    onChange={this.handleChange}
                    rows="1"
                    value={this.state.messageText}
                    placeholder="Type message..."
                    onKeyDown={this.handleSubmit}
                >
                </textarea>
              <button
                className='Footer__Button Footer__SubmitButton'
                onClick={this.handleSubmit}
              >
              </button>
            </footer>
        );
    }
}

export const ConnectedFooter = connect(stateToProps)(Footer);
