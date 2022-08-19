const { response } = require('express');
const express = require('express');
const app = express();

const persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.get('/info', (request, response) => {
	let today = new Date();
	let date =
		today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	let time =
		today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	let dateTime = date + ' ' + time;
	response.send(
		`<p>Phonebook has data on ${persons.length} people</p> <p>${dateTime}</p>`
	);
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
