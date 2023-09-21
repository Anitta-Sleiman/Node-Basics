/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const trimText = text.trim().split(" ")[0]; // this will remove the space then split it to take the first index and assign it to new variable
  // console.log(text.trim().split(" ")[0]);
  const txt = text.trim(); // the trim will remove the space from the text and assign it to txt
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (trimText === "hello") {
    hello(text.replace("\n", "")); //it will replace the \n from the line
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    //if the text variable is list then the list function will be called
    list();
  } else if (txt.startsWith("add")) {
    //this will check if the user's input starts with add;
    const newTask = txt.substring(3).trim(); //if it's true it will assign the value after add to the variable newTask; substring(3) to remove the first 3 letters = add
    add(newTask); //to pass the newTask as an argument to add function
  } else if (txt.startsWith("remove")) {
    //this will check if the user's input starts with remove
    const removedTask = txt.trim(); //if its true it will remove whitespaces and assign it to removedTask
    remove(removedTask); // calls remove function and pass removedTask as arg
  } else if (txt.startsWith("edit")) {
    //if the text variable is edit then the list function will be called
    const editTask = txt.substring(4).trim();
    edit(editTask);
  } else {
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  console.log(text + "!"); //it will take the passed argument which is text and returns it with !
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

/**
 * Display all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log(
    "help: display list of all possible commands",
    "\nexit or quit: exits the app",
    "\nhello(text): hello + (text)!",
    "\nlist: display the list",
    "\nadd(newTask): add a new task to the list",
    "\nremove: remove the last task from the list",
    "\nremove <index>: remove corresponding task"
  );
}

const listItems = ["buy bread", "do the exercises", "eat shawarma at 6"]; //created an array
/**
 * list function
 *
 * @returns {void}
 */
function list() {
  listItems.map((item, index) => {
    // map will iterate over each element in the 'listItems
    console.log(index + 1 + " - [ ] " + item);
  });
}

/**
 * add function
 *
 * @returns {void}
 */
function add(newTask) {
  //we passed argument newTask
  if (newTask) {
    //check if newTask has a value
    listItems.push(newTask); //this will push the added input to the array
    console.log(newTask + " is added");
  } else {
    console.log("Error! Please add a task!"); //if nothing is inserted, the user will be alerted to add a task
  }
}

/**
 * remove function
 *
 * @returns {void}
 */
function remove(removedTask) {
  let isfunction = false;
  let index = removedTask.slice(6, removedTask.length).trim() - 1;
  if (removedTask.trim().length == 6) {
    listItems.pop();
    console.log("Last element Removed succesfully");
  } else if (
    parseInt(removedTask.split(" ")[1]) > listItems.length ||
    index < 0 ||
    isNaN(index)
  ) {
    //it will split the value of the removedTask to elements and change the element at index 1 to integer by using parseInt
    //if the integer is greater than the number of elements in the listItems it will give the following output
    console.log("Enter a valid request");
    isfunction = true;
  } else {
    listItems.splice(index, 1);
    console.log(`Task ${index + 1} Removed succesfully`);
  }
}

/**
 * edit function
 *
 * @returns {void}
 */
function edit(editTask) {
  //we passed argument newTask
  // let editTask = text.slice(4, text.length).trim();
  let index = editTask.trim().split(" ")[1] - 1;
  console.log(editTask);
  let NewText = editTask.slice(4, editTask.length).trim();
  // let new_text = text.slice(7, text.length);
  if (text.length === 4) {
    console.log("Error");
  }
}

// The following line starts the application
startApp("Anitta Sleiman");
