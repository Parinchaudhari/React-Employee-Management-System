const express = require('express')
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const fs = require('fs')
const app = express()
const mongoose = require('mongoose')
const employeeS = require('./models/employeeSchema');
const { error } = require('console')
const port = process.env.api_port



// console.log(process.env.api_port)

// const path = require('path')

//mongodb connection string for the MongoDB Atlas 
mongoose.connect(process.env.DB_URL)

//varibels created to checke the working of the about meesaage and data 
let empmessage = "Employye Data Fetched"

//resolveers for the GraphQl Schema
const resolvers = {
  Query: {
    about: () => empmessage,
    getAllEmp: getEmpData
  },
  Mutation: {
    setAboutMessage,
    addEmployee,
    updateEmployee,
    deleteEmployee
  }
}
//resolver fucntion defination which fetches all  the dtaa from mongoDb
async function getEmpData() {

  //fethc all  the data form Db using moongoose
  let data = await employeeS.find()

  // console.log(data)
  // retruning the data fetched
  return data
}
//resolver fucnton used to set the message
function setAboutMessage(_, { message }) {
  return empmessage = message
}

//resolver fucntion to add the data into the dtaabse
async function addEmployee(_, { inp }) {
  //adding tjhe data into databse using moongoose
  employeeS.create(inp).then((e) => {
    console.log(e + "i am then method")
  }).catch((error) => {
    console.log("errror" + error)
  })
  //retrun the data the data
  return inp
}

//update resolver
async function updateEmployee(_, {inpup}) {
  // console.log("i am id"+id)
  console.log(inpup)
   await employeeS.findByIdAndUpdate(inpup._id,inpup).then((e)=>{
    console.log("data updated")
  }).catch((error)=>{
    console.log("error"+error)
  })
  return inpup
}
//delete resolver
async function deleteEmployee(_,{id}){
  console.log(id)
  await employeeS.findByIdAndDelete(id).then((e)=>{
    console.log("deleted it")
  }).catch((error)=>{
    console.log("cannot dleet item"+error)
  })
}

app.get('/', (res, req) => {
  req.redirect('/graphql')
})

//creatting the apollo server  and passing rhe schema for grpahql
const server = new ApolloServer({ typeDefs: fs.readFileSync('schema.graphql', 'utf-8'), resolvers })
// server.start().then(res=>{
//   server.applyMiddleware({ app, path: '/graphql' });
//   app.listen(port, () => {
//     console.log(`Example app listening on ports ${port}`)
//   })
// })

//starting the apollo server and the appication on 4000 and 3000 port respectively 
server.start().then((res) => {
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(port, () => console.log(`API server started at ${port}`));
});

// app.listen(3000, function () {
//   console.log("App started on port 3000");
// });