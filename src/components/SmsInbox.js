import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class SmsInbox extends Component {
	render() {
		return (
			<div className="SmsInbox">
				Box
			</div>
		);
	}
}

SmsInbox.propTypes = {
  data: PropTypes.array
}

export default SmsInbox;