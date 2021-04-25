const mongoose = require('mongoose');

// const validator = require('validator');

const taskSchema = new mongoose.Schema({
	description:{
		type: String,
		required: true,
		trim: true,
	},
	completed:{
		type: Boolean,
		required: false,
		default: false,
		trim: true
	},
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	}
},{
	timestamps: true
})
// before save
taskSchema.pre('save', async function(next){
	const task = this
	next();
})

Task = mongoose.model("task", taskSchema);

module.exports = Task;