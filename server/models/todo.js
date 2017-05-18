var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String, // 숫자, 불리언 값 넣어도 문자열로 캐스팅 됨
        required: true,
        minlength: 1,
        trim: true 
    },
    completed: {
        type: Boolean,
        default: false    
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};