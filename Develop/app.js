const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");
console.log('Start by entering the first team members name.  Then follow prompts in order to complete team formation');
function newTeamMember() {
    
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "name?",
      },
      {
        type: "input",
        name: "id",
        message: "employee id?",
      },
      {
        type: "input",
        name: "email",
        message: "email?",
      },
      {
        type: "list",
        name: "role",
        message: "what role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        name: "input",
        name: "officeNumber",
        when: function (data) {
          return data.role === "Manager";
        },
        message: "office number?",
      },
      {
        name: "input",
        name: "github",
        when: function (data) {
          return data.role === "Engineer";
        },
        message: "github?",
      },
      {
        name: "input",
        name: "school",
        when: function (data) {
          return data.role === "Intern";
        },
        message: "what school?",
      },
      {
        type: "confirm",
        name: "nextEmployee",
        message: "would you like to add another employee?",
        default: true,
      },
    ])
    .then((data) => {
      let newEmployees = "";
      name = data.name;
      id = data.id;
      email = data.email;
      officeNumber = data.officeNumber;
      github = data.github;
      school = data.school;

      if (data.role === "Manager") {
        newEmployees = new Manager(name, id, email, officeNumber);
      } else if (data.role === "Engineer") {
        newEmployees = new Engineer(name, id, email, github);
      } else if (data.role === "Intern") {
        newEmployees = new Intern(name, id, email, school);
      }
      employees.push(newEmployees);

      if (data.nextEmployee) {
        newTeamMember();
      } else {
        (function () {
          const postRender = render(employees);
          fs.writeFile(outputPath, postRender, (err) =>
            err ? console.log(err) : console.log("all done success!")
          );
        })();
      }
    });
}

newTeamMember();
