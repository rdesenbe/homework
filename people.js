const readline = require("readline");

const main = async () => {
	let storage = [];
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	while (true) {
		const name = await ask(rl, "What is your name?: ");
		if (name.toLowerCase() == "quit") {
			console.log(storage);
			rl.close();
			break;
		}
		const email = await ask(rl, "What is your email?: ");
		if (email.toLowerCase() == "quit") {
			console.log(storage);
			rl.close();
			break;
		}
		const person = {
			name: name,
			email: email,
		};
		sortAndStore(storage, person);
	}
};
const ask = (rl, query) => {
	return new Promise((resolve) =>
		rl.question(query, (ans) => {
			resolve(ans);
		})
	);
};
const sortAndStore = (storage, person) => {
	const value = person.name;
	const storageLength = storage.length;
	let i = storageLength / 2;
	let indexer = [0, storageLength - 1];
	if (storageLength == 0) {
		storage.push(person);
		return storage;
	}
	if (storageLength == 1) {
		if (value[0] > storage[0].name[0]) {
			storage.splice(1, 0, person);
			return storage;
		}
		if (value[0] < storage[0].name[0]) {
			storage.splice(0, 0, person);
			return storage;
		}
	}
	if (storageLength == 2) {
		if (value[0] > storage[1]) {
			storage.splice(2, 0, person);
			return storage;
		} else if (value[0] < storage[0]) {
			storage.splice(0, 0, person);
		} else if (value[0] > storage[0] && value[0] < storage[1]) {
			storage.splice(1, 0, person);
		}
	}

	console.log(storage.length);
	while (storageLength == storage.length) {
		// if median value (i) > new value> median (i) -1
		console.log(i);
		if (storage[i].name[0] > value[0] && value[0] > storage[i - 1].name[0]) {
			storage.splice(i - 1, 0, person);
			break;
			// if median value (i) < new value < median (i) + 1
		} else if (
			storage[i].name[0] < value[0] &&
			value[0] < storage[i + 1].name[0]
		) {
			storage.splice(i, 0, person);
			break;
			// if new value > median value (i)
		} else if (value[0] > storage[i].name[0]) {
			indexer[0] = i;
			i = (i + indexer[1]) / 2;
			// if new value < median value (i)
		} else if (value[0] < storage[i].name[0]) {
			indexer[1] = i;
			i = (indexer[0] + i) / 2;
		}
	}
};

main();
