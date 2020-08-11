// Install inquirer by typing "npm install inquirer" in the console.

// required libraries
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Takes a function following the common error-first callback style, i.e. taking a (err, value) => ... callback as the last argument, and returns a version that returns promises.
const writeFileAsync = util.promisify(fs.writeFile);

// Creates array of questions
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your project?",
            name: "title"
    }, {
        type: "input",
        message: "Please enter a description of your project.",
        name: "description"
    }, {
       type: "checkbox",
       message: "Please select a license.",
       choices: [
           "Apache",
           "MIT",
           "ISC",
           "None"
       ],
       name:"license" 
    }
])
};

// Writes to the .md
function generateMarkdownLang(response) {
    return `
    # ${response.title}

    # Table of Contents
    
    - [Description](#description)
    - [License](#license)

    ## Description:
        ${response.description}

    ## License:
        ${response.license}
    `
};

// Starts the prompts to the user and returns either created succesfully message or error.
async function init() {
    try {
        const responce = await promptUser();

        const readMe = generateMarkdownLang(responce);

        await writeFileAsync("README.md", readMe);
        console.log("Readme file created!");
    } catch (err) {
        console.log(err)
    }
};

init()