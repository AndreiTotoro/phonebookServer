const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@phonebook.i476und.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = mongoose.Schema({
	id: Number,
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect(url)
	.then((result) => {
		const person = new Person({
			id: 1,
			name: 'Andrei',
			number: '123456789',
		});

		return person.save();
	})
	.then(() => {
		return mongoose.connection.close();
	});
