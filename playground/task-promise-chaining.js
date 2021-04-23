require('../src/db/mongoose');

const Task = require('../src/models/task')

const taskDeleteAndIncomplete = async(_id)=> {
	const task = await Task.findByIdAndDelete(_id)
	if(!task){
		throw new Error(`task with id ${_id} is not found`)
	}
	console.log(task);
	const incomplete = await Task.countDocuments({completed: false})
	return incomplete;
}

taskDeleteAndIncomplete("607ec7a04c26fa2d5ca73452")
.then(incomplete => console.log(incomplete))
.catch(error => console.error(error))

// Task.findByIdAndDelete("607ec7a04c26fa2d5ca73452")
// .then(result => {
// 	console.log(result)
// 	return Task.countDocuments({completed: false})
// }).then(count => console.log(count))
// .catch(error => console.log(error))