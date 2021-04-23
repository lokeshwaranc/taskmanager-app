const bcrypt = require('bcryptjs')
const myFunc = async() =>{
	const password = "password@123"
	const hashedPassword = await bcrypt.hash(password, 8)
	console.log(hashedPassword)
	const status = await bcrypt.compare("password@123", hashedPassword)
	console.log(status)
}
myFunc()