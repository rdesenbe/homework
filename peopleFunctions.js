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
	let i = Math.floor(storageLength / 2);

	let indexer = [0, storageLength - 1];
	if (storageLength == 0) {
		storage.push(person);
		return storage;
	}
	if (storageLength == 1) {
		if (value > storage[0].name) {
			storage.splice(1, 0, person);
			return storage;
		}
		if (value < storage[0].name) {
			storage.splice(0, 0, person);
			return storage;
		}
	}
	if (storageLength == 2) {
		if (value > storage[1].name) {
			storage.splice(2, 0, person);
			return storage;
		} else if (value < storage[0].name) {
			storage.splice(0, 0, person);
			return storage;
		} else if (value > storage[0].name && value < storage[1].name) {
			storage.splice(1, 0, person);
			return storage;
		}
	}

	if (storageLength == 3) {
		if (value > storage[2].name) {
			storage.splice(3, 0, person);
			return storage;
		} else if (value < storage[0].name) {
			storage.splice(0, 0, person);
			return storage;
		}
	}

	console.log(storage.length);
	while (storageLength == storage.length) {
		// if median value (i) > new value> median (i) -1
		console.log("current i", i);
		if (value > storage[storageLength - 1].name) {
			storage.push(person);
		} else if (value < storage[0].name) {
			storage.splice(0, 0, person);
		} else if (value == storage[i].name) {
			storage.splice(i, 0, person);
		} else if (storage[i].name > value && value > storage[i - 1].name) {
			storage.splice(i, 0, person);
			// if median value (i) < new value < median (i) + 1
		} else if (storage[i].name < value && value < storage[i + 1].name) {
			storage.splice(i + 1, 0, person);
			// if new value > median value (i)
		} else if (value > storage[i].name) {
			indexer[0] = i;
			i = Math.floor((i + indexer[1]) / 2);
			// if new value < median value (i)
		} else if (value < storage[i].name) {
			indexer[1] = i;
			i = Math.floor((indexer[0] + i) / 2);
		}
	}
	return storage;
};
const search = (query, storage) => {
	const result = storage.filter((person) => person.name == query);
	return result;
};
exports.ask = ask;
exports.sortAndStore = sortAndStore;
exports.search = search;
