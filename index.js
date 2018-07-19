const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

// process env port is the port the host will assign
const PORT = process.env.PORT || 5000;
app.listen(PORT);