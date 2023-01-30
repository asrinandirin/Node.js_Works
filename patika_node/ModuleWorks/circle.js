const circleArea = (radius) => {
    area = 3.14*(radius*radius);
    console.log(Math.round(area * 100) / 100);
};

const circleCircumference = (radius) => {
    circumference = (Math.round(2*(3.14*radius) * 100) / 100);
    console.log(circumference);
};

module.exports = {
    circleArea,
    circleCircumference
};
