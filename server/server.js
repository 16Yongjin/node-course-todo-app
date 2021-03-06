require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

/* ======== Save a Todo ======== */

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

/* ======== Get All Todos ======== */

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

/* ======== Get Specific Todo ======== */

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) { // if id is wrong
        return res.status(404).send('¯\_(ツ)_/¯');
    }

    Todo.findById(req.params.id).then((todo) => {
        if(!todo) { // if id not exist
            return res.status(404).send('Todo not found');
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

/* ======== Delete a Todo ======== */

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('¯\_(ツ)_/¯');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('Todo not found');
        }

        res.send({todo});
    },(e) => {
        res.status(400).send(e);
    })
});

/* ======== Update a Todo ======== */


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); //Get update info.


    if (!ObjectID.isValid(id)) {
        return res.status(404).send('¯\_(ツ)_/¯');
    }

    if (_.isBoolean(body.completed) && body.completed) { // update completed Date
        body.completedAt = new Date().getTime(); //posix time
    } else {
        body.completed = false;
        body.completedAt = null;
    }


    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
    
});

/* ======== POST USER ======== */
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e)
    })

});

/* ======== AUTH USER ======== */
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

/* ======== LOGIN USER ======== */
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);   
        })
    }).catch((e) => {
        res.status(400).send();
    })
});

/* ======== DELETE USER ======== */
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})



app.listen(port, () => {
    console.log(`Statred up at Port ${port}`);
});

module.exports = {app};