const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
	}]
})

userSchema.methods.toJSON = function() {
	const user = this
	userObject = user.toObject();
	
	delete userObject.password
	delete userObject.tokens
	return userObject
}

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = await jwt.sign({_id: user.id.toString()}, "secretkey")
	user.tokens = user.tokens.concat({token})
	
	return token
}

userSchema.statics.findByCredentials = async(email, password) =>{
	const user = await User.findOne({email})
	// console.log(user);
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

userSchema.pre('save', async function(next){
	const user = this 
	// console.log('this is before saving!')
	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8)
	}
	
	// console.log("hashed pswd:"+user.password)
	next();
})


User = mongoose.model("users",userSchema)

module.exports = User;