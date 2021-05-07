const express = require('express');
const multer = require('multer');

const User = require('../models/user');
const auth = require('../middlewares/auth');

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

const avatar = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb){
		if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
			return cb(new Error('Please upload a image'))
		}
		cb(undefined, true)
	}
}, )


userRouter.get('/users/:id/avatar', async(req, res) =>{
	try {
		const user= await User.findById(req.params.id)
		if(!user || !user.avatar){
			throw new Error('no data found')
		}
		res.set('Content-Type', 'image/jpeg')
		res.send(user.avatar);
		
	} catch (error) {
		res.status(400).send('error in fetching avatar')
	}
})

userRouter.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res)=>{
	req.user.avatar = req.file.buffer
	await req.user.save()
	res.send();
},
(error, req, res, next)=>{
	res.status(400).send({error: error.message})
})

userRouter.delete('/users/me/avatar', auth, async(req, res)=>{
	req.user.avatar = undefined
	await req.user.save()
	res.send();
} )

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