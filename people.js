
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});
let storage = []
while(true){
rl.question("What is your name",name=>{
rl.question("Email Address?", email=>{
    const person = {
        name:name,
        email:email
    }
storage.push(person)
console.log(storage)
}
)

})}