const readline = require("readline");
const { sortAndStore, ask, search } = require("./peopleFunctions");
const main = async () => {
  let storage = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // keeps program running until user types 'quit'
  while (true) {
    // sora - search or add
    const sora = await ask(rl, "Search or Add?:  ");
    if (sora.toLowerCase() == "add") {
      // check for add
      //prompting user for information to add
      const name = await ask(rl, "What is your name?: ");
      // check for quit
      if (name.toLowerCase() == "quit") {
        console.log(storage);
        rl.close();
        break;
      }
      const email = await ask(rl, "What is your email?: ");
      // check for quit
      if (email.toLowerCase() == "quit") {
        console.log(storage);
        rl.close();
        break;
      }
      // create the object to be added to storage
      const person = {
        name: name,
        email: email,
      };
      //call sortAndStore() to add new user to storage
      console.log(sortAndStore(storage, person)); // sortAndStore called within a console log so we can see result in terminal
      console.log("storage size:", storage.length);
      // check for search
    } else if (sora.toLowerCase() == "search") {
      // prompt user for person to search for
      const query = await ask(rl, "Search For (Full Name): ");
      if (query.toLowerCase() == "quit") {
        // check for quit
        console.log(storage);
        rl.close();
        break;
      }

      //call search on the data inputted by user
      const result = search(query, storage);
      console.log(result);
    }
  }
};

main();
