import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../stylesheets/SmsInbox.css';

class SmsInbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessages: {},
      unreadMessage: 0
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {

      //  Sort the data by chronological order
      nextProps.data.items.sort(this.compareDates);

      //  Find the total number of unread message
      let unreadMessage = 0;

      nextProps.data.items.forEach(function(item) {
        if (item.is_new) { 
          unreadMessage++;
        }
      });

      this.setState({
        textMessages: nextProps.data,
        unreadMessage
      })
    }
  }

  compareDates = (item1, item2) => {
    //  Sort by dates by descending order
    if (new Date(item1.created_at) > new Date(item2.created_at)) {
      return -1;
    } else if (new Date(item2.created_at) > new Date(item1.created_at)) {
      return 1;
    }

    return 0;
  }

  convertToReadablePhone = (number) => {
    if (number[1] === '1' && number.length === 12) {
      const country = "+" + number[1];
      const areacode = " (" + number.substring(2,5) + ") ";
      const digit = number.substring(5, 8) + "-" + number.substring(8,12);
      number = country + areacode + digit;
    }

    return " " + number;
  }

  convertToReadableTime = (timestamp) => {
    const datetime = new Date(timestamp);
    const date = datetime.getMonth() + "/" + datetime.getDate() + "/" + datetime.getFullYear();
    const time = datetime.getHours() + ":" + (datetime.getMinutes() < 10 ? '0' : '') + datetime.getMinutes() + ":" + datetime.getSeconds();
    
    return date + " " + time;
  }

  markMessage = (item, i) => {
    const { textMessages, unreadMessage } = this.state;

    let newTextMessages = Object.assign({}, textMessages);

    if (item.is_new) {
      newTextMessages.items[i].is_new = false;

      this.setState({
        textMessages: newTextMessages,
        unreadMessage: unreadMessage - 1
      })

      console.log("Calling Mark Message Unread for ID: " + item.id);
    } else {
      newTextMessages.items[i].is_new = true;

      this.setState({
        textMessages: newTextMessages,
        unreadMessage: unreadMessage + 1
      })

      console.log("Calling Mark Message Unread for ID: " + item.id);

      return;
    }
  }

  render() {
    const { textMessages, unreadMessage } = this.state;

    return (
      <div className="SmsInbox">
        <div className="Header">You have {unreadMessage} unread messages</div>
        <div className="Body">
          {textMessages.items && 
            textMessages.items.map((item, i) => {
              return (
                <div 
                  className="Message" 
                  key={"messages__"+i} 
                  onClick={() => this.markMessage(item, i)}
                >
                  <div className="Avatar"></div>
                  <div className={item.is_new ? "Bold Content": "Content"}>
                    {item.to[0].status === "received" ? "From" : "To"}: 
                    {this.convertToReadablePhone(item.to[0].number)} <br/>
                    Time: {this.convertToReadableTime(item.created_at)} <br/>
                    "{item.text}" <br/>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

SmsInbox.propTypes = {
  data: PropTypes.object
}

export default SmsInbox;