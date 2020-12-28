
const readline = require("readline");

const main = async ()=>{
    
    let storage = []
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    while(true){
        const name = await add(rl,"What is your name?: ")
console.log(name)
        if (name.toLowerCase() = "quit"){
            break
        }
    }

}
const add = (rl, query)=>{
    return new Promise(resolve => rl.question(query, ans => {
       
        resolve(ans);
    }))
}
main() 