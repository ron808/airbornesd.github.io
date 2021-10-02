// implementation -> files / folder interact

let fs = require("fs");

// reading the file after passing it path 
let content = fs.readFileSync("f1.txt");

// if we didn't use '+' operator then we will get buffer which is in low level and hexa decimal
// because we alway get data in low level and then it is converted accordingly, when we used '+' it was converted into string which is text
console.log("content : ",content);
// content :  <Buffer 54 65 73 74 20 66 69 6c 65 20 63 68 65 63 6b 65 64>

console.log("content : "+content);
// content : Test file checked 

// Function No - 2 
// write -> writeFileSync
// if file doesn't exist -> it will create a file and put the content
// if file does exist -> it will overwrite

fs.writeFileSync("abc.txt","Test Content 1");
// new file created of name abc

// update
fs.appendFileSync("abc.txt","Test Append Function")
// content appended in the same file without space 

// delete 

fs.unlinkSync("abc.txt");
console.log("Removed");