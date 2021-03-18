let mysql = require('mysql');

const config = {
    host : "localhost",
    user : "root", 
    password : '', 
    database : 'nodethree'
};

class MysqlUtilities {

    /* Persons */
    getPersons(callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * from persons', (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    getPersonById(id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM persons WHERE id_p=?', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    deletePerson(id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('DELETE FROM persons WHERE id_p=?', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    updatePerson(change, id, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE persons SET firstname=? WHERE id_p=?', [change, id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    addPersons(newPerson, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO persons (lastname, firstname) VALUES (?,?)', [newPerson.lastname, newPerson.firstname], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    /* Spe */

    getSpe(callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * from spe', (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    getSpeById(id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM spe WHERE id_s=?', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    deleteSpe(id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('DELETE FROM spe WHERE id_s=?', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    updateSpe(changeSpe, id, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE spe SET name=? WHERE id_s=?', [changeSpe, id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    addSpe(newSpe, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO spe (name) VALUES (?)', [newSpe.name], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    /* Persons & Spe */

    getPersonsWSpe(callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT persons.*, GROUP_CONCAT(spe.name) FROM persons JOIN assoc ON persons.id_p = assoc.id_pers JOIN spe ON spe.id_s = assoc.id_spe GROUP BY persons.id_p', (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    getPersonByIdWSpe(id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT persons.*, GROUP_CONCAT(spe.name) FROM persons JOIN assoc ON persons.id_p = assoc.id_pers JOIN spe ON spe.id_s = assoc.id_spe WHERE id_p=?', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    getPersonsByIdWSpeById(id,other_id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT persons.*, GROUP_CONCAT(spe.name) FROM persons JOIN assoc ON persons.id_p = assoc.id_pers JOIN spe ON spe.id_s = assoc.id_spe WHERE id_p=? AND id_s=?', [id, other_id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    addPersonWAll(id,other_id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO assoc (id_pers, id_spe) VALUES (?,?)', [id,other_id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    updatePersonWAll(other_id,id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE assoc SET id_spe=? WHERE id_pers=?', [other_id, id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    deletePersonWAll(id,callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('DELETE FROM assoc WHERE id_pers=?', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
}

// Export the class and methods
module.exports = new MysqlUtilities();