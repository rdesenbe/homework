const readline = require("readline");
const { sortAndStore, ask, search } = require("./peopleFunctions");
const main = async () => {
	let storage = [];
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	while (true) {
		const sora = await ask(rl, "Search or Add?:  ");
		if (sora.toLowerCase() == "add") {
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
			console.log(sortAndStore(storage, person));
			console.log("storage size:", storage.length);
		} else if (sora.toLowerCase() == "search") {
			const query = await ask(rl, "Search For (Full Name): ");
			if (query.toLowerCase() == "quit") {
				console.log(storage);
				rl.close();
				break;
			}
			const result = search(query, storage);
			console.log(result);
		}
	}
};

main();
