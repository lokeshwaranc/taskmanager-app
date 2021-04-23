const express = require('express');

const User = require('../models/user');
const auth = require('../middlewares/auth')

const userRouter = new express.Router()

userRouter.post('/users',async (req,res)=>{
	try {
		const userData = new User(req.body)
		const token = await userData.generateAuthToken()
		const user = await userData.save()
		//console.log(token)
		res.send({user, token})
	} catch (error) {
		res.status(400).send(error)
	}
})

userRouter.get('/users/me', auth, async (req, res)=>{
	res.send(req.user)
	// try {
	// 	res.send(req.users)
	// } catch (error) {
	// 	res.status(401).send(error)
	// }
})

userRouter.get('/users/:id', async(req, res)=>{
	try {
		const _id = req.params.id
		const user = await User.findById(_id)
		if(!user){
			return res.status(400).send("user not found")
		}
		res.send(user)
	} catch (error) {
		res.status(400).send(error)
	}
})

userRouter.patch('/users/me', auth, async(req, res)=>{
	try {
		const updates = Object.keys(req.body)
		const allowedUpdates = ['name','email','password','age']
		const isValidOperation = updates.every(update =>allowedUpdates.includes(update))

		if(!isValidOperation){
			res.status(400).send('Invalid operation')
		}
		updates.forEach(update => req.user[update] = req.body[update])
		await req.user.save()
		// const user = await User.findByIdAndUpdate(_id, req.body,{new:true, runValidators: true})
		res.send(req.user)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
})

userRouter.delete('/users/me', auth, async(req, res)=>{
	try {
		// const _id = req.user.id
		// const user = await User.findByIdAndDelete(_id)
		// console.log('here')
		// console.log(user)
		await req.user.remove()
		res.send(req.user)
	} catch (error) {
		res.status(500).send(error)
	}
})

userRouter.post('/users/login', async (req, res)=>{
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken()
		// console.log("token", token)
		await user.save();
		res.send({user: user,token})
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
})

userRouter.post('/users/logout', auth, async(req, res)=>{
	try {
		req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
		await req.user.save()
		res.send(req.user)
	} catch (error) {
		res.status(500).send(error)
	}
})

userRouter.post('/users/logoutall', auth, async(req, res) =>{
	try {
		req.user.tokens = []
		await req.user.save();
		res.send(req.user)
	} catch (error) {
		res.status(500).send(error)
		
	}
})

module.exports = userRouter;