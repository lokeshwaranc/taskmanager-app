const jwt = require('jsonwebtoken')

const User = require('../models/user')

const auth = async (req, res, next) =>{
	try {
		//console.log(req.header('Authorization'))
		const token = req.header('Authorization').replace('Bearer ', '')
		//console.log(token)
		const decoded = jwt.verify(token, 'secretkey')
		const user = await User.findOne({"_id":decoded._id, "tokens.token":token})
		console.log(user)
		if(!user){
			throw new Error("unaccessible!")
		}
		req.token = token
		req.user = user
		next()
	} catch (error) {
		res.status(401).send({error:'authentication error'})
	}
}

module.exports = auth;