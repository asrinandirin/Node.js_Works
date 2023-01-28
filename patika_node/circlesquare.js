const area = (radius) => {
    return 3.14*(radius*radius);
}

console.log(area(process.argv.slice(2)));
