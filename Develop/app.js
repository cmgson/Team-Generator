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
 function newTeamMember () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'employee id?',

        },
        {
            type: 'input',
            name: 'email',
            message: 'email?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'what role?',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            name: 'input',
            name: 'officeNumber',
            when: function(data) {
                return data.role === 'Manager';
            },
            message: 'office number?',
        },
        {
            name: 'input',
            name: 'github',
            when: function(data) {
                return data.role === 'Engineer';
            },
            message: 'github?',
        },
        {
            name: 'input',
            name: 'school',
            when: function(data) {
                return data.role === 'Intern'
            },
            message: 'what school?',
        },
        {
            type: 'confirm',
            name: 'nextEmployee',
            message: 'would you like to add another employee?',
            default: true,
        },

    ]).then((data) =>{
        console.log(data);
        let newEmployees = '';
        name = data.name;
        id = data.id;
        email = data.email;
        officeNumber = data.officeNumber;
        github = data.github;
        school = data.school;
       
        if(data.role === 'Manager') {
             newEmployees = new Manager(name, id, email, officeNumber);

        }else if (data.role === 'Engineer') {
             newEmployees = new Engineer(name, id, email, github);

        }else if (data.role === 'Intern') {
             newEmployees = new Intern(name, id, email, school);

        };
        // console.log(newEmployees);
        employees.push(newEmployees);
        console.log('this is the employees' + employees);
        

        if (data.nextEmployee) {
            newTeamMember();

        } else {
            console.log(employees);
            (function () {

                const htmlContent = render(employees);
                console.log(htmlContent);
                fs.writeFile(outputPath, htmlContent, (err) =>
                err ? console.log(err): console.log("all done success!"));
                
            })();

        };
    
    });

    
};


newTeamMember();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
