const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// console.log that your server is up and running
app.listen(port, () => console.log(`Starting Node Server on port ${port}`));

// create a GET route
app.get('/api', (req, res) => {
  res.send({
		"total": 2,
		"offset": 0,
		"limit": 25,
		"items": [
			{
				"id": "08aeefrd-7408-11e4-9f47-cb5644081d04",
				"from": "+17329910138",
				"to": [
					{
						"number": "+17327704100",
						"status": "received"
					}
				],
				"direction": "in",
				"created_epoch": 1476659032,
				"created_at": "2016-10-16T23:03:52+00:00",
				"is_new": false,
				"text": "We received this message",
			},
			{
				"id": "8f7a99b533655f9482bcfe25bb845a86d6c28344",
				"from": "+17329910138",
				"to": [
					{
						"number": "+17326838492",
						"status": "sent"
					}
				],
				"direction": "out",
				"created_epoch": 1476659133,
				"created_at": "2016-10-16T23:05:33+00:00",
				"is_new": true,
				"text": "We sent this message",
			},
		]
	});
});