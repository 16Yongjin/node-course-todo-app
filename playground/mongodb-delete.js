const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eating lunch'}).then((result) => {
    //     console.log(result);
    // })

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eating lunch'}).then((result) => {
    //     console.log(result);
    // })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // })


    // Challenge

    db.collection('Users').deleteMany({name: 'Jin'}).then((res) => {
        console.log(res);
    })

    db.collection('Users').findOneAndDelete({_id: new ObjectID("591701962094db30a30f22ed")}).then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
    })

    // db.close();
})
