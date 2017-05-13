// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //없으면 생성함 대신 데이터를 넣어야 됨
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
        
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Jin',
        age: 21,
        location: 'Seoul'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user info', err);
        }
        console.log(JSON.stringify(result.ops[0]._id, undefined, 2)); 
    })

    db.close();
});



// var user = {
//     name: 'Yongjin',
//     age: 21
// }
// var {name} = user; //객체 부수기
// 
// console.log(name);