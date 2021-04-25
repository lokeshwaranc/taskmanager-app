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

taskRouter.get('/tasks', auth, async (req, res)=>{
	try {
		const match ={}
		const sort = {}
		if(req.query.completed){
			match.completed = req.query.completed === 'true'
		}
		if(req.query.sortBy){
			const sortBy = req.query.sortBy.split(":")
			sort[sortBy[0]] = sortBy[1] === 'desc' ? -1 : 1
		}
		// const tasks = await Task.find({owner:req.user._id})
		// console.log("tasksss ", tasks)
		// if(tasks.length === 0){
		// 	return res.send({error:"no task found"})
		// }
		await req.user.populate({
			path: 'tasks',
			match,
			options:{
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort
			}
		}).execPopulate()
		if(req.user.tasks.length === 0){
			return res.send({error:"no task found"})
		}
		// console.log(req.user.tasks)
		res.send(req.user.tasks)
	} catch (error) {
		// console.log(error)
		res.status(400).send(error)
	}
})

taskRouter.get('/tasks/:id', auth, async (req, res)=>{
	try {
		const _id = req.params.id
		const task = await Task.findOne({_id, owner: req.user._id})
		if(!task){
			return res.status(400).send("No task found!")
		}
		res.send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

taskRouter.patch('/tasks/:id', auth, async(req, res)=>{
	try {
		const updates = Object.keys(req.body)
		const allowedUpdates = ['description','completed']
		const isValidOperation = updates.every(update =>allowedUpdates.includes(update))

		if(!isValidOperation){
			res.status(400).send('Invalid operation')
		}
		const _id = req.params.id
		const task = await Task.findOne({_id, owner: req.user._id});

		if(!task){
			return res.status(400).send("task not found")
		}

		updates.forEach(update => task[update] = req.body[update]);
		await task.save();
		//const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
		
		res.send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

taskRouter.delete('/tasks/:id', auth, async(req, res)=>{
	try {
		const _id = req.params.id
		const task = await Task.findOneAndDelete({_id, owner: req.user._id})
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