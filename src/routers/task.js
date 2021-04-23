const express = require('express');

const Task = require('../models/task');
const auth = require('../middlewares/auth');

const taskRouter = new express.Router();

taskRouter.post('/tasks', auth, async (req, res)=>{
	try {
		const task = new Task({
			...req.body,
			owner: req.user._id
		})
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

taskRouter.get('/tasks', async (req, res)=>{
	try {
		const tasks = await Task.find({})
		res.send(tasks)
	} catch (error) {
		res.status(400).send(error)
	}
})

taskRouter.get('/tasks/:id',async (req, res)=>{
	try {
		const _id = req.params.id
		const task = await Task.findById(_id)
		if(!task){
			return res.status(400).send("No task found!")
		}
		res.send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

taskRouter.patch('/tasks/:id', async(req, res)=>{
	try {
		const updates = Object.keys(req.body)
		const allowedUpdates = ['description','completed']
		const isValidOperation = updates.every(update =>allowedUpdates.includes(update))

		if(!isValidOperation){
			res.status(400).send('Invalid operation')
		}
		const _id = req.params.id
		const task = await Task.findById(_id);
		updates.forEach(update => task[update] = req.body[update]);
		await task.save();
		//const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
		if(!task){
			return res.status(400).send("task not found")
		}
		res.send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

taskRouter.delete('/tasks/:id', async(req, res)=>{
	try {
		const _id = req.params.id
		const task = await Task.findByIdAndDelete(_id)
		if(!task){
			return res.status(400).send('task not found')
		}
		res.send(task)
	} catch (error) {
		res.status(500).send(error)
	}
})

// taskRouter.get('/tasks/:id',(req, res)=>{
// 	Task.findById(req.params.id)
// 	.then(task =>{
// 		if(!task){
// 			console.log(task);
// 			return res.status(400).send("No task found!")
// 		}
// 		console.log(task);
// 		res.send(task);
// 	})
// 	.catch(error =>{
// 		console.log(error);
// 		res.send(error);
// 	})
// })

module.exports = taskRouter;