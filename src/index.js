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

app.listen(PORT,()=>console.log('server is up on port '+PORT));
