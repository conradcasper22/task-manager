const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate (value) {
            if (value.length < 6) {
                throw new Error('Password must be longer than six characters.')
            } else if (value.includes('password')) {
                throw new Error('Password cannot be "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }   
    }
})

const me = new User({
    name: '      Conrad      ',
    email: 'MYEMAIL@CASPER.IO       '
})

// const me = new User({
//    name: 'Conrad',
//    age: 'Mike' 
// })

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const walkDog = new Task({
//     description: 'walk roscoe',
//     completed: true
// })

// walkDog.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })