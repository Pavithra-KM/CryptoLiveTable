import { MongoClient } from 'mongodb';

const url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, (err, client) => {
	if (err) {
		console.error('Failed to connect to the database. Error:', err);
		return;
	}
	console.log('Connected successfully to the database');

	global.tasksDb = client.db("tasks");
	global.pricesCollection = tasksDb.collection("prices");
});