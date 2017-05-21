const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashed = '$2a$10$VZJrfyx129yE2OCyjkLyyOa/BQsxb87sWroDVaCW2yjRFAN2KRD5q';

bcrypt.compare(password, hashed, (err, res) => {
    console.log(res);
});



// var message = 'I am user no.3';
// var hash = SHA256(message).toString();

// console.log(hash);

// var data = {
//     id: '4'
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+'somescrete').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'somescrete').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed!!!');
// }

