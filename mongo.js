const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@phonebook.i476und.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = mongoose.Schema({
	id: Number,
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
	mongoose
		.connect(url)
		.then((result) => {
			const person = new Person({
				id: Math.floor(Math.random() * 10000 + 1),
				name: process.argv[3],
				number: process.argv[4],
			});
			console.log(
				`Added ${person.name} number ${person.number} to the phonebook!"`
			);
			return person.save();
		})
		.then(() => {
			return mongoose.connection.close();
		});
} else if (process.argv.length === 3) {
	mongoose.connect(url).then(() => {
		Person.find({}).then((result) => {
			console.log('Phonebook:');
			result.forEach((person) => {
				console.log(`${person.name} ${person.number}`);
			});
			mongoose.connection.close();
		});
	});
} else {
	console.log(
		'Invalid number or arguments! Please provide either just your password or your password and the name and phone number of the person you want to add to the phonebook!'
	);
}
