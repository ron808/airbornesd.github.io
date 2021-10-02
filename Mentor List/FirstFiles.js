// read from f1.txt, capitalize, write to f2.txt
// node FirstFiles.js --source=f1.txt --dest=f2.txt
// Install minimist -> npm install minimist

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

// read file f1.txt
let stext = fs.readFileSync(args.source, "utf-8");
// capitalize
let dtext = stext.toUpperCase();
// write to f2.txt
fs.writeFileSync(args.dest, dtext, "utf-8");