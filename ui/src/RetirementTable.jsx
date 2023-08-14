import React, { Component } from "react";
import { Link } from "react-router-dom";
//Employee Table Component
export default class EmployeeTable extends Component {
  constructor(){
    super()
    this.state={
      empData:[]
    }
  }
  componentDidMount(){
    let query=`query GetRetiries {
      getRetiries {
        _id
        fname
        age
        lname
        joindate
        title
        department
        employeetype
        currentstatus
      }
    }`
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query})
    }).then(res => res.json()).then(data => {
      console.log("write worked")
      console.log(data.data.getRetiries)
      this.setState({empData:data.data.getRetiries})
    })
  }
  render() {
    console.log("retirmnrt")
    console.log(this.props.empdata)
    return (
      // table for the display of data
      <div className="center">
        <table>
          <caption>Employee's List</caption>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date Of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {/* looping throught the data recevied frrom Employee Directory to displu on the dom using map */}
            {this.state.empData.map((e, i) => {
              return (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.fname}</td>
                  <td>{e.lname}</td>
                  <td>{e.age}</td>
                  <td>{e.joindate}</td>
                  <td>{e.title}</td>
                  <td>{e.department}</td>
                  <td>{e.employeetype}</td>
                  <td>{e.currentstatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
