const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysqlUtilities = require('./utilities/MysqlUtilities');
const Person = require('./beans/Person');
const Speciality = require('./beans/Speciality');
const pug = require('pug');
const { body, validationResult } = require('express-validator');

app.use(bodyParser.json());
app.set('view engine', 'pug');

/*PUG*/
// display the results in HTML
// app.get('/persons', (req, res) => {
  
//     mysqlUtilities.getPersons
//     ((result, error) => {
//         if(!error) {
//             console.log(result)
//             let person = result
//             res.render("test", [persons=person, title="Hello U", data=result] )
//         }else {
//             res.status(500).send(error)
//         }
//     })
// });

// app.get('/persons/:id', (req, res) => {
//     let id = req.params.id
//     mysqlUtilities.getPersonById
//     (id,(result, error) => {
//         if(!error) {
//             let person = result
//             res.render("test", [persons=person, title="Hello U", data=result] )
//         }else {
//             res.status(500).send(error)
//         }
//     })

// });

/* GET */
app.get('/persons', (req, res) => {
  
    mysqlUtilities.getPersons
    ((result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.get('/spe', (req, res) => {
    console.log("Toutes les spécialités /");
    mysqlUtilities.getSpe
    ((result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.get('/persons/spe', (req, res) => {
    console.log("Toutes les personnes et leur spécialités /");
    mysqlUtilities.getPersonsWSpe
    ((result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.get('/persons/:id', (req, res) => {
    let id = req.params.id
    mysqlUtilities.getPersonById
    (id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })

});

app.get('/spe/:id', (req, res) => {
    console.log("spécialité avec l'id/");
    mysqlUtilities.getSpeById
    ((result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.get('/persons/:id/spe', (req, res) => {
    console.log("personne avec l'id et sa spe /");
    let id = req.params.id
    mysqlUtilities.getPersonByIdWSpe
    (id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })

});

app.get('/persons/:id/spe/:other_id', (req, res) => {
    console.log("personne avec l'id et sa spe /");
    let id = req.params.id
    let other_id = req.params.other_id
    mysqlUtilities.getPersonsByIdWSpeById
    (id,other_id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })

});

/* POST */
app.post('/persons', body('lastname').isAlpha(), body('firstname').isAlpha(),(req, res) => {
    let newPerson = new Person(req.body.lastname,req.body.firstname);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mysqlUtilities.addPersons
    (newPerson, (result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.post('/spe', body('name').isAlpha(), (req, res) => {
    let newSpe = new Speciality(req.body.name);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mysqlUtilities.addSpe
    (newSpe, (result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.post('/persons/:id/spe/:other_id', body('other_id').isInt(), (req, res) => {
    console.log("personne avec l'id et sa spe /");
    let id = req.params.id
    let other_id = req.params.other_id
    other_id = req.body.other_id

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mysqlUtilities.addPersonWAll
    (id,other_id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })

});

/* DELETE */
app.delete('/persons/:id', (req, res) => {
    let id = req.params.id
    mysqlUtilities.deletePerson
    (id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.delete('/spe/:id', (req, res) => {
    let id = req.params.id
    mysqlUtilities.deleteSpe
    (id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.delete('/persons/:id/spe/:other_id', (req, res) => {
    console.log("personne avec l'id et sa spe /");
    let id = req.params.id
    mysqlUtilities.deletePersonWAll
    (id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })

});

/* PUT */
app.put('/persons/:id', body('firstname').isAlpha(),(req, res) => {
    let id = req.params.id;
    let change = req.body.firstname;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mysqlUtilities.updatePerson
    (change, id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.put('/spe/:id', body('name').isString(), (req, res) => {
    let id = req.params.id;
    let changeSpe = req.body.name;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mysqlUtilities.updateSpe
    (changeSpe, id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })
});

app.put('/persons/:id/spe/:other_id', body('id').isInt(), body('other_id').isInt(),  (req, res) => {
    console.log("personne avec l'id et sa spe /");
    let id = req.params.id
    let other_id = req.params.other_id
    other_id = req.body.other_id
    id=req.body.id

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mysqlUtilities.updatePersonWAll
    (other_id,id,(result, error) => {
        if(!error) {
            res.send(result)
        }else {
            res.status(500).send(error)
        }
    })

});

app.listen(port, () => {
    console.log('example app listening at http://localhost:${port}')
});