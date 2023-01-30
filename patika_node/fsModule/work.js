import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'node:fs';

try {
    console.log("file creating...");
    appendFileSync("employees.json", '{"name": "sss", "salary": 1000}', "utf8")
    console.log("file created");
    
    console.log("file reading...");
    let data = readFileSync("employees.json", "utf-8")
    console.log("data :", data);
    
    console.log("file updating...");
    writeFileSync("employees.json", '{"name": "sss", "salary": 5000}', "utf8")
    data = readFileSync("employees.json", "utf-8")
    console.log("update success, data:", data);

    console.log("file deleting...");
    unlinkSync("employees.json")
    console.log("file deleted");

} catch (error) {
    console.log(error);
}
