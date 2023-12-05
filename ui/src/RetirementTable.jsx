import React, { Component } from "react";
import { Container, Table } from 'react-bootstrap';

//Employee Table Component
export default class EmployeeTable extends Component {
  constructor() {
    super()
    this.state = {
      empData: []
    }
  }
  componentDidMount() {
    let query = `query GetRetiries {
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
      body: JSON.stringify({ query })
    }).then(res => res.json()).then(data => {
      console.log("write worked")
      console.log(data.data.getRetiries)
      this.setState({ empData: data.data.getRetiries })
    })
  }
  render() {
    console.log("retirmnrt")
    console.log(this.props.empdata)
    return (
      <Container className="d-flex align-items-start justify-content-center my-4" style={{ minHeight: '100vh' }}>
        {/* table for the display of data */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="9" className="text-center fs-2">Upcoming Retirement Employee List</th>
            </tr>
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
            {/* Looping through the data received from Employee Directory to display on the DOM using map */}
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
        </Table>
      </Container>
    );
  }
}
