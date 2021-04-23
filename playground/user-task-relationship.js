// require('../src/db/mongoose')
// const Task = require('../src/models/task')
// const User = require('../src/models/user')
// const myFunc = async () =>{
// 	 const task = await Task.findById("60829a2f4db8050478681c9d")
// 	 //console.log(task.owner)
// 	 await task.populate('owner').execPopulate()
// 	 //const user = await User.findById(task.owner)
// 	 console.log('only task', task)
// }

// const myFunction = async () =>{
// 	const user = await User.findById("60827638317f9c4750a9f7e2")
// 	await user.populate('tasks').execPopulate()
// 	console.log('user task', user.tasks)
// }

// myFunc()
// myFunction()