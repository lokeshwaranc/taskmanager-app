const mongoose = require('mongoose');
const validator = require('validator');


const uri = process.env.MONGODB_URL;

mongoose.connect(uri,{useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true})
.then(result=> console.log("Mongo Atlas connected"))
.catch(error => console.log(error))

// User = mongoose.model("user-api",{
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	age: {
// 		type: Number,
// 		required: false,
// 		default: 18,
// 		validate(value){
// 			if(value < 18) {
// 				throw new Error('Age must be above 18')
// 			}
// 		}
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		validate (value){
// 			if(!validator.isEmail(value)){
// 				throw new Error('Invalid email')
// 			}
// 		}
// 	},
// 	password:{
// 		type: String,
// 		required: true,
// 		trim: true,
// 		validate(value){
// 			if(value.length < 6 || value.toLowerCase().includes("password")){
// 				throw new Error("Password validation error")
// 			}
// 		}
// 	}
// })

// const user1 = new User({
// 	name: "Raja",
// 	age: 22,
// 	email: "raja@gmail.com",
// 	password:"   password@123"
// })

// user1.save().then(result =>{console.log(result)})
// .catch(error => console.log(error))

// Task = mongoose.model("task",{
// 	description:{
// 		type: String,
// 		trim: true,
// 		required: true
// 	},
// 	completed:{
// 		type: Boolean,
// 		required: false,
// 		default: false
// 	}
// });

// task1 = new Task({
// 	description: "Repair bike",
// })

// task1.save().then(result => console.log(result))
// .catch(error => console.log(error))