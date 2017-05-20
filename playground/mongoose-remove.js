const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// } )


Todo.findOneAndRemove({}).then((res) => {
    console.log(res);
})


// Todo.findByIdAndRemove('591edd9eb86d35511c431e6f').then((res) => {
//     console.log(res);
// })