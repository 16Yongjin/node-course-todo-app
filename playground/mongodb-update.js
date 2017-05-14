const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5916fe7f2094db30a30f2172")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5916de511225eb164210456f")
    }, {
        $set: {
            name: 'John'
        },
        $max: {
            age: 33
        }

    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })

    // db.close();
})
