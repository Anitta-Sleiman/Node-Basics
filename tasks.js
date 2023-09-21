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
    "\nremove 1: remove the first task from the list",
    "\nremove 2: remove the second task from the list"
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
  if (removedTask === "remove") {
    listItems.splice(listItems.length - 1, 1); //removes last element from array
    console.log(listItems);
  } else if (removedTask === "remove 1") {
    listItems.splice(0, 1); //removes first element from the array
    console.log(listItems);
  } else if (removedTask === "remove 2") {
    listItems.splice(1, 1); //removes second element from the array
    console.log(listItems);
  } else if (parseInt(removedTask.split(" ")[1]) > listItems.length) {
    //parseInt will parse the integer part of the string so if we put remove 3 it will take it as 3 < length of the listItems
    console.log("You entered a number that does not exist!");
  }
}

// The following line starts the application
startApp("Anitta Sleiman");
