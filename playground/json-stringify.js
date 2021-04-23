const user = {
	name:"Kalpesh",
	email:"kalpesh@example.com",
	age:3,
	city:"Chennai",
	password:"kalpesh@123",
	about: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nihil dolores perspiciatis, ducimus ab, iure ut laboriosam ullam qui nisi a autem minus officiis velit? Nobis odit quisquam minima ipsum!"
}
// user.toJSON = function() {
// 	console.log("inside to toJSON function ", this)
// 	return this;
// }

// user.toJSON = function () {
// 	console.log('inside json func')
// 	return {}
// }

// user.toJSON = function () {
// 	delete this.password;
// 	delete this.email;
// 	return this
// }

user.func = function () {
	delete this.password;
	delete this.email;
	return this
}

const userJSON = user.func()
//console.log('userJSON variable ',userJSON)
console.log("Stringify ", JSON.stringify(user))