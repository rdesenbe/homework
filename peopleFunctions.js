//function to prompt user for response given query and readline
const ask = (rl, query) => {
  //returns an asynchronous Promise
  // rl.question takes as long as the user takes so a Promise allows us
  // to pass the "promise" of the data in the future as a variable
  //within the promise there is a function which is takes (resolve, reject)
  // as paramters. call resolve(result) when desired data is found. call reject(error) if error
  return new Promise((resolve) =>
    //prompt user
    rl.question(query, (ans) => {
      resolve(ans);
    })
  );
};

//function to sort each person and add them to storage along the way so that
// storage is always sorted

const sortAndStore = (storage, person) => {
  //get name out of person and label as value
  const value = person.name;
  // create variable for initial length of storage
  const storageLength = storage.length;
  //set the starting point for searching through array (midpoint)
  let i = Math.floor(storageLength / 2);
  // indexer is the bounds that are currently being searched. Starts with whole
  // array and then gets cut in half each time
  let indexer = [0, storageLength - 1];

  //handle adding person when storage is empty
  if (storageLength == 0) {
    storage.push(person);
    //return and jump out of function
    return storage;
  }
  //handle adding  when there is only 1 other person in storage
  if (storageLength == 1) {
    if (value > storage[0].name) {
      storage.splice(1, 0, person);
      //return and jump out of function
      return storage;
    }
    if (value < storage[0].name) {
      storage.splice(0, 0, person);
      //return and jump out of function
      return storage;
    }
  }
  //handle adding when storagelength ==2
  // returns and jumps out of function after adding
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
  //handle add for length ==3
  //return and jump out of function after
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
  //implementation of binary search and sort.
  /* start in the middle of array and check greater than or less than
  then chop array in half and start in middle again until correct 
  location is found */
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
  //use filter function instead of implementing binary search again
  const result = storage.filter((person) => person.name == query);
  return result;
};
// export each of the functions above so they can be called from external files
exports.ask = ask;
exports.sortAndStore = sortAndStore;
exports.search = search;
