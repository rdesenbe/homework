const readline = require("readline");
const { sortAndStore, ask, search } = require("./peopleFunctions");
const fs = require("fs");
/*

1. TODO: create a function that will be called when user quits.

function will write the contents of storage to a text file before quitting so 
that the "database of users" will persist after typing quit.

2. TODO: create a function that will be called upon startup.

function will check for a storage.txt and intialzie storage with the contents of 
text file before starting. If no txt file then proceed with empty storage.

3. TODO: add a prompt inside of your 'add' logic for the persons ETH address. 
once they add their eth address, call the getBalance() function using ethers 
or web3js. Add their balance and ETH address to the person object before 
calling sort and store. 

will need to create an account with infura and get an api in order to access chain

4. TODO: create a function that checks if a users address is holding dai.
	
will need to get contract address and abi from etherscan. 

create contract instance for dai using ethers or web3js and then call the balance function on address

  */

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
    // check for add
    if (sora.toLowerCase() == "add") {
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
      sortAndStore(storage, person); // sortAndStore called
      console.log("storage size:", storage.length);
      // check for search
    } else if (sora.toLowerCase() == "search") {
      // prompt user for person to search for
      const query = await ask(rl, "Search For (Full Name): ");
      // check for quit
      if (query.toLowerCase() == "quit") {
        // save(storage);
        rl.close();
        break;
      }

      //call search on the data inputted by user
      const result = search(query, storage);
      console.log(result);
    }
  }
};
// and example save to file function
const save = (storage) => {
  let file = fs.createWriteStream("src/storage.txt");
  file.on("error", (err) => console.error(err));
  storage.map((person) => {
    file.write(person.name + ", " + person.email + "," + "\n");
  });
  file.end();
};

const startup = () => {};
main();
