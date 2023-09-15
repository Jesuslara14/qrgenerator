const fs = require('fs');
const inquirer = require('inquirer');
const qr = require('qr-image');

inquirer.prompt([
    {
        message: "Enter your URL",
        name: 'URL'
    }
]).then(answers => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('output.png'));
})