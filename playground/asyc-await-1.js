require('../src/db/mongoose');

const User = require('../src/models/user');

const updateAndCount = async (_id, age) =>{
	const user = await User.findByIdAndUpdate(_id, {age});
	const count = await User.countDocuments()
	return count;
}

updateAndCount("607eb84cd29c0f1b17f08551", 32)
.then(count => console.log(count))
.catch(error => console.log(error))