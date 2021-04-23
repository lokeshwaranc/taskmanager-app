const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// const uri = "mongodb+srv://root:Qwerty`123@cluster0.c23ur.mongodb.net/todo?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://root:Qwerty`123@cluster0.c23ur.mongodb.net/todo?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri,  { useNewUrlParser: true, useUnifiedTopology: true });

	async function listDatabases(client){
		databasesList = await client.db().admin().listDatabases();
		console.log("Databases:");
		databasesList.databases.forEach(db => console.log(` - ${db.name}`));
	}; 

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
		const db = client.db("todo");
		//const userDataCollection = db.collection("user-details");

        // userDataCollection.deleteOne({_id: new ObjectID("60784612b3c1776be39d0014")})
        // .then(result =>console.log(result))
        // .catch(error => console.log(error))

        // userDataCollection.updateOne({name:"lokeshwaranc"}, {$inc: {age:-5}})
        // .then(result =>{console.log(result)})
        // .catch(error =>{console.log(error)})


        // userDataCollection.find({name:"lokeshwaranc"}).toArray((error, user)=>{
        //     if(error){
        //         return console.log("Error: unable to connect");
        //     }
        //     console.log(user)
        // })

		// let userDetail = {
		// 	"name": "lokeshwaranc",
		// 	"age": "30",
		// 	"email": "lokeshwaranc@gmail.com",
		// 	"city": "Chennai"
		// }
		// userDataCollection.insertOne(userDetail,(error, result)=>{
        //     if(error){
        //         return console.log('Error: Unable to connect to DB!')
        //     }
        //     console.log(result.ops)
        // });
        // let userDetails =
        //     [{
        //         "name":"user1",
        //         "age":"23",
        //         "email":"user@user.com"
        //     },{
        //         "name":"user2",
        //         "age":"22",
        //         "email":"user@user.com"
        //     },{
        //         "name":"user3",
        //         "age":"27",
        //         "email":"user@user.com"
        //     }
        // ]
        // userDataCollection.insertMany(userDetails,(error, result)=>{
        //     if(error){
        //         return console.log('Error: Unable to connect to DB!')
        //     }
        //     console.log(result.ops);
        // })
        // const taskDataCollection = db.collection("tasks");

        // taskDataCollection.deleteMany({completed: false})
        // .then(result => console.log(result))
        // .catch(error => console.log(error))

        // taskDataCollection.updateMany({completed: false}, {$set:{completed: true}})
        // .then(result => console.log(result))
        // .catch(error =>{console.log(error)})

        // taskDataCollection.find({completed: true}).toArray((error, results)=>{
        //     if(error){
        //         return console.log("Error: Unable to connect to DB");
        //     }
        //     results.map(result=>{
        //         console.log(result.description);
        //     })
        // })
        // let taskDetails = [{
        //     description: "Wash my clothes",
        //     completed: true
        // },{
        //     description: "buy groceries",
        //     completed: true
        // },{
        //     description:"call to Team members",
        //     completed: false
        // },{
        //     description: "book tickets",
        //     completed: false
        // }];
        // taskDataCollection.insertMany(taskDetails,(error, data)=>{
        //     if(error){
        //         return console.log("Error: Unable to insert data!");
        //     }
        //     console.log(data.ops);
        // })
        // const id = new ObjectID()
        // console.log(id);
        // console.log(id.toHexString());
        // console.log(id.toHexString().length);
        // console.log(id.getTimestamp());
        // console.log(id.id)
        // console.log(id.id.length)

    } catch (e) {
        console.error(e);
    } //finally {
    //     await client.close();
    // }
	
}

main().catch(console.error);