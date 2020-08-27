// Install inquirer by typing "npm install inquirer" in the console.

// required libraries
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

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
        }, {
            type: "input",
            message: "What are the steps needed to install the following project?.",
            name: "installation"
        },  {
            type: "input",
            message: "How will your project be used?",
            name: "usage"
        },  {
            type: "input",
            message: "Did you collaberate with anyone? If so provide github links for yours and any contributors.",
            name: "contributing"
        },  {
            type: "input",
            message: "Provide and examples of your project and let us know how to run them.",
            name: "test"
        },  {
            type: "input",
            message: "Please provide your github link.",
            name: "github"
        }
])
};

// Writes to the .md
function generateMarkdownLang(response) {
    return `
# ${response.title}

## Table of Contents
    
* [Description](#description)
* [License](#license)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Testing](#test)
* [Github](#github)

## <a name="description">Description:</a>
*    ${response.description}

## <a name="license">License:</a>
*    ${response.license}

## <a name="installation">Installation:</a>
*    ${response.installation}

## <a name="usage">Usage:</a>
*    ${response.usage}

## <a name="contributing">Contributing:</a>
*    ${response.contributing}

## <a name="test">Testing:</a>
*    ${response.test}

## <a name="github">Github URL:</a>
*    [${response.github}](${response.github})
    `
};

// Starts the prompts to the user and returns either created succesfully message or error.
async function init() {
    try {
        const responce = await promptUser();

        const readMe = generateMarkdownLang(responce);

        await writeFileAsync("README3.md", readMe);
        console.log("Readme file created!");
    } catch (err) {
        console.log(err)
    }
};

init()