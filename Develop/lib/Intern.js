const Employee = require('Develop/lib/Employee.js');

// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern extends Employee {
    constructor (school) {
        super(name, id, email)
        this.school = school;
    }

    getSchool() {};

    getRole() {
        return 'Intern';
    };


}

module.exports = Intern;