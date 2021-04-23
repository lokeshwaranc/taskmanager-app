require('../src/db/mongoose');

const User = require('../src/models/user');

User.findByIdAndUpdate("607eb84cd29c0f1b17f08551", {age: 23})
.then(user => {
	console.log(user)
	return User.countDocuments({age: 41})
}).then(count => {
	console.log(count)
}).catch(error => console.error(error))