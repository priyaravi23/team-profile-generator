const inquirer = require("inquirer");
const fs = require("fs");
const style = require("./src/style");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

let finalTeamArray = [];

function startingPrompt() {
    inquirer.prompt([
        {
            message: "******** Welcome to Team Profile Generator! Please enter your team name: ********",
            name: "teamname"
        }
    ])
        .then(data => {
            const teamName = data.teamname;
            finalTeamArray.push(teamName);
            addManager();
        })
}

function addManager() {
    inquirer.prompt([
        {
            message: "What is your team manager's name? (Required)",
            name: "name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return "Please enter your manager's name";
                }
            }
        },
        {
            message: "What is your team manager's employee id?",
            name: "id",
            validate: empId => {
                const valid = /^[0-9]+$/.test(empId);

                if (valid) {
                    return true;
                } else {
                    return "Please enter a number";
                }
            }
        },
        {
            message: "What is your team manager's email address? (Required)",
            name: "email",
            validate: email => {
                const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

                if (valid) {
                    return true;
                } else {
                    return "Please enter a valid email address";
                }
            }
        },

        {
            type: "number",
            message: "What is your team manager's office number?",
            name: "officeNumber"
        },
    ])

        .then(data => {
            const name = data.name;
            // const id = finalTeamArray.length;
            const id = data.id;
            const email = data.email;
            const officeNumber = data.officeNumber;
            const teamMember = new Manager(name, id, email, officeNumber);
            finalTeamArray.push(teamMember);
            addTeamMembers();
        });
}

function addTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["Yes, add an engineer", "Yes, add an intern", "No, my team is complete"],
            name: "addMemberData"
        }
    ])

        .then(data => {

            switch (data.addMemberData) {
                case "Yes, add an engineer":
                    addEngineer();
                    break;

                case "Yes, add an intern":
                    addIntern();
                    break;
                case "No, my team is complete":
                    compileTeam();
                    break;
            }
        });
}

function addEngineer() {
    inquirer.prompt([
        {
            message: "What is this engineer's name? (Required)",
            name: "name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return "Please enter the engineer's name";
                }
            }
        },
        {
            message: "What is your engineer's employee id?",
            name: "id",
            validate: empId => {
                const valid = /^[0-9]+$/.test(empId);

                if (valid) {
                    return true;
                } else {
                    return "Please enter a number";
                }
            }
        },
        {
            message: "What is this engineer's email address? (Required)",
            name: "email",
            validate: email => {
                const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

                if (valid) {
                    return true;
                } else {
                    return "Please enter a valid email address";
                }
            }
        },
        {
            message: "What is this engineer's Github profile?",
            name: "github"
        }
    ])

        .then(data => {
            const name = data.name;
            // const id = finalTeamArray.length;
            const id = data.id;
            const email = data.email;
            const github = data.github;
            const teamMember = new Engineer(name, id, email, github);
            finalTeamArray.push(teamMember);
            addTeamMembers();
        });
}

function addIntern() {
    inquirer.prompt([
        {
            message: "What is this intern's name? (Required)",
            name: "name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return "Please enter the intern's name";
                }
            }
        },
        {
            message: "What is your intern's employee id?",
            name: "id",
            validate: empId => {
                const valid = /^[0-9]+$/.test(empId);

                if (valid) {
                    return true;
                } else {
                    return "Please enter a number";
                }
            }
        },
        {
            message: "What is this intern's email address? (Required)",
            name: "email",
            validate: email => {
                const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

                if (valid) {
                    return true;
                } else {
                    return "Please enter a valid email address";
                }
            }
        },
        {
            message: "What is this intern's school?",
            name: "school"
        }
    ])

        .then(data => {
            const name = data.name;
            // const id = finalTeamArray.length;
            const id = data.id;
            const email = data.email;
            const school = data.school;
            const teamMember = new Intern(name, id, email, school);
            finalTeamArray.push(teamMember);
            addTeamMembers()
        });
}

function generateHtml(finalTeamArray) {
    return `./dist/${finalTeamArray[0].toLowerCase().split(' ').join('-')}.html`
}

function generateTitle(finalTeamArray) {
    return finalTeamArray[0].replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function compileTeam() {
    console.log("Wonderful! You have now successfully created your team's profile");

    const htmlArray = [];
    const htmlBeginning = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${generateTitle(finalTeamArray)}</title>
            <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet">
            <style>
             ${style}
            </style>
        </head>
        <body>
            <div class="banner-bar">
                <h1>${finalTeamArray[0]}</h1>
            </div>
            <div class="card-container">
    `;

    htmlArray.push(htmlBeginning);

    for (let i = 1; i < finalTeamArray.length; i++) {
        let object = `
        <div class="member-card">
            <div class="card-top">
                <h2>${finalTeamArray[i].name}</h2>
                <h2>${finalTeamArray[i].title}</h2>
            </div>
            <div class="card-bottom">
                <p>ID: ${finalTeamArray[i].id}</p>
                <p>Email: <a href="mailto:${finalTeamArray[i].email}">${finalTeamArray[i].email}</a></p>
        `;

        if (finalTeamArray[i].officeNumber) {
            object += `
            <p>Office Number: ${finalTeamArray[i].officeNumber}</p>
            `
        }

        if (finalTeamArray[i].github) {
            object += `
            <p>GitHub: <a href="https://github.com/${finalTeamArray[i].github}" target="_blank">${finalTeamArray[i].github}</a></p>
            `
        }

        if (finalTeamArray[i].school) {
            object += `
            <p>School: ${finalTeamArray[i].school}</p>
            `
        }

        object += `
            </div>
            </div>
        `;

        htmlArray.push(object)
    }

    const htmlEnd = `
    </div>
    </body>
    </html>
    `;

    htmlArray.push(htmlEnd);

    fs.writeFile(generateHtml(finalTeamArray), htmlArray.join(""), function (err) {
        if (err) {
            throw err;
        }
    })
}

startingPrompt();