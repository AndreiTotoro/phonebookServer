const express = require('express');
const app = express();

app.get('/api', (request, response) => {
	response.send(`<h1>Hello</h1>`);
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
