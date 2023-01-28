const user_input = process.argv.slice(2);

const area = (radius) => {
    return 3.14*(radius*radius);
}

const output = area(user_input[0]);
if (!isNaN(output) && output < 9999){
    console.log(output);
}
