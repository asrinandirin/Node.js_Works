const input = area(process.argv.slice(2))

const area = (radius) => {
    return 3.14*(radius*radius);
}

if (isNaN(input)){
    console.log(area(input));
}


