const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const { Timestamp } = require('bson');
userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		trim: true
	},
	email:{
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error("Enter valid email")
			}
		}
	},
	password:{
		type: String,
		required: true,
		trim: true,
		minlength: 7
	},
	age:{
		type: Number,
		trim: true,
		default:0
	},
	tokens:[{
		token:{
			type: String,
			required: true
		}
	}],
	avatar: {
		type: Buffer
	}
}, {
	timestamps: true
})

userSchema.virtual('tasks', {ref: 'task', localField: '_id', foreignField: 'owner'})

userSchema.methods.toJSON = function() {
	const user = this
	userObject = user.toObject();
	
	delete userObject.password
	delete userObject.tokens
	delete userObject.avatar
	return userObject
}

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = await jwt.sign({_id: user.id.toString()}, process.env.JWT_SECRET)
	user.tokens = user.tokens.concat({token})
	//console.log(token)
	return token
}

userSchema.statics.findByCredentials = async(email, password) =>{
	const user = await User.findOne({email})
	if(!user){
		throw new Error('Unable to login!')
	}
	const isMatch = await bcrypt.compare(password, user.password)
	// console.log(isMatch)
	if(!isMatch){
		throw new Error('Unable to login')
	}
	return user;
}

// before save
userSchema.pre('save', async function(next){
	const user = this 
	// console.log('this is before saving!')
	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8)
	}
	
	// console.log("hashed pswd:"+user.password)
	next();
})

userSchema.pre('remove', async function(next){
	const user = this
	await Task.deleteMany({owner: user._id})
	next()
})


User = mongoose.model("users",userSchema)

module.exports = User;