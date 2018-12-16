import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../stylesheets/SmsInbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    	//	Sort the data by chronological order
    	nextProps.data.items.sort(this.compareDates);

    	//	Find the total number of unread message
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

	render() {
		const { textMessages, unreadMessage } = this.state;

		return (
			<div className="SmsInbox fa-igloo">
				<div className="Header">You have {unreadMessage} unread messages</div>
				<div className="Body">
					{textMessages.items && 
						textMessages.items.map((item, i) => {
							return (
								<div className="Message" key={"messages__"+i}>
									time: {item.created_at} <br/>
									is_new: {item.is_new} <br/>
									text: {item.text} <br/>
									participant: {item.to[0].number}
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