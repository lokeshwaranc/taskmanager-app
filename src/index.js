const express = require('express');
const jwt = require('jsonwebtoken');
const { json } = require('express');

require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

const PORT = process.env.PORT || 3000

// maintenance block
// app.use('',(req, res, next) => {
// 	res.status(503).send('we are under maintenance now! come back soon!!')
// 	// next()
// })

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.get('',(req, res)=>{
	res.send("<h1>Task Manager Application</h1>")
})

// const bcrypt = require('bcryptjs')
// const myFunc = async() =>{
// 	const password = "password@123"
// 	const hashedPassword = await bcrypt.hash(password, 8)
// 	console.log(hashedPassword)
// 	const status = await bcrypt.compare("password@123", hashedPassword)
// 	console.log(status)
// }
// myFunc()

app.listen(PORT,()=>console.log('server is up on port '+PORT));

// const myFunc =() =>{
// 	const token = jwt.sign('hello','secretcode')
// 	console.log(token)
// 	const verifyy= jwt.verify(token, 'secretcode')
// 	console.log(verifyy)
// 	console.log(jwt.decode(token))
// }
// myFunc()