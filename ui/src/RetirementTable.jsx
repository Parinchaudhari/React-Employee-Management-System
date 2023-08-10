import React, { Component } from "react";
import { Link } from "react-router-dom";
//Employee Table Component
export default class EmployeeTable extends Component {
  render() {
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
            {this.props.empdata.map((e, i) => {
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
