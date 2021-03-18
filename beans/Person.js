
class Person {
    id;
    lastname;
    firstname;
    
    constructor(lastname, firstname) {
        this.id = null;
        this.lastname = lastname;
        this.firstname = firstname;
    }
}

// Export only the class
module.exports = Person;