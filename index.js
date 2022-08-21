const { response, request } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
	console.log('---');
	next();
};

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(morgan('tiny'));

let persons = [
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
	let today = new Date().toDateString();
	response.send(
		`<p>Phonebook has data on ${persons.length} people</p> <p>${today}</p>`
	);
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const note = persons.find((person) => person.id === id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

app.post('/api/persons/', (request, response) => {
	const body = request.body;
	if (!body.number || !body.name) {
		return response.status(400).json({
			error: 'content missing',
		});
	}

	if (persons.find((pers) => pers.name == body.name)) {
		return response.status(400).json({
			error: 'name already exists',
		});
	}

	const person = {
		id: Math.floor(Math.random() * 1000 + 1),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	response.json(person);
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
