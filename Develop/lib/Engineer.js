const Employee = require('Develop/lib/Employee.js');

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(github) {
        super(name, id, email);
        this.github = github;

    }
    getRole() {
        return 'Engineer';
    }

    getGithub() {};
}

module.exports = Engineer;