const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function mainMenu() {
    function createManager() {
        console.log("Please build your team")
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "input",
            name: "managerID",
            message: "What is your manager's ID?",
            validate: answer => {
                if (parseInt(answer) > 0) {
                    idArray.push(answer)
                    return true;
                }
                return "Please enter a valid ID"
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
            validate: answer => {
                if (answer.includes("@") && answer !== "") {
                    return true;
                }
                return "Please enter a valid email"
            }
        },
        {
            type: "input",
            name: "managerNumber",
            message: "What is your manager's office number?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a phone number"
            }
        }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerNumber)
            teamMembers.push(manager)

            addTeamMember();
        })
    }
    createManager();

    function createEngineer() {
        inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's ID?",
            validate: answer => {
                if (idArray.includes(answer) == false && parseInt(answer) > 0) {
                    idArray.push(answer)
                    return true;
                }
                return "Please enter an ID"
            }

        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter an email"
            }
        },
        {
            type: "input",
            name: "engineerNumber",
            message: "What is the engineer's GitHub?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a phone number"
            }
        }

        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerNumber)
            teamMembers.push(engineer)

            addTeamMember();
        })
    }
    function createIntern() {
        inquirer.prompt([{
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "input",
            name: "internID",
            message: "What is the intern's ID?",
            validate: answer => {
                if (idArray.includes(answer) == false && parseInt(answer) > 0) {
                    idArray.push(answer)
                    return true;
                }
                return "Please enter an ID"
            }

        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter an email"
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a phone number"
            }
        }

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)

            addTeamMember();
        })
    }

    function addTeamMember() {
        inquirer.prompt([{
            type: "list",
            name: "memberType",
            message: "Which type of team member would you like to add?",
            choices: ['Engineer',
                "Intern",
                "I don't want to add anymore team memebers"]
        }
        ]).then(answers => {
            switch (answers.memberType){
            case "Engineer":
                createEngineer(); 
                break;
            case "Intern":
                createIntern(); 
                break;
            case "I don't want to add anymore team memebers":
                renderHTML(); 
                break;
               
            }
        })
    }

    function renderHTML(){
        if(!fs.existsSync("./output")){
            fs.mkdirSync("./output")
        }
        fs.writeFile(outputPath, render(teamMembers) , (err)=>{
        if (err) throw err;
        console.log("The file was saved!");
    })
    }
}
mainMenu()

