import React, { Component } from 'react'

export default class EmployeeDelete extends Component {
  constructor() {
    super()
  }
  //getting the userid from url before the components get mounted
  componentDidMount() {
    //storing it in a variable
    const deleteEmployeeId = window.location.href.split('/')[4]
    console.log(deleteEmployeeId)
    let variables ={
      deleteEmployeeId
    }
      
    
    //graphql query to delet emeployee
    let query = `mutation DeleteEmployee($deleteEmployeeId: String!) {
      deleteEmployee(id: $deleteEmployeeId)
    }`

    //using fetch api to make a call to graphql and passing the userid for graphql resolvers to delet the data 
     fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    }).then(res =>res.json()).then(data=>{
      console.log(data.data.deleteEmployee)
      alert(data.data.deleteEmployee)
      window.location.href = '/';
    }).catch(error => {
      alert("Cannot Delete Data Try Again")
      console.log(error)
    })

  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
