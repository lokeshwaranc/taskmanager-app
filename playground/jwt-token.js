
const myFunc =() =>{
	const token = jwt.sign('hello','secretcode')
	console.log(token)
	const verifyy= jwt.verify(token, 'secretcode')
	console.log(verifyy)
	console.log(jwt.decode(token))
}
myFunc()