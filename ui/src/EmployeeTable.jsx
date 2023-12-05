import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Container } from 'react-bootstrap';

//Employee Table Component
export default class EmployeeTable extends Component {
    render() {
        return (
            <Container className="d-flex align-items-start justify-content-center my-4" style={{ minHeight: '100vh' }}>
                {/* table for the display of data */}
                <Table>
                    <thead>
                        <tr>
                            <th colSpan="10" className="text-center fs-2">Employee List</th>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.empdata.map((e, i) => (
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
                                <td>
                                    <Link className="btn btn-outline-dark mx-1" to={`update/${e._id}`}>Update</Link>
                                    <Link className="btn btn-outline-danger mx-1" to={`delete/${e._id}`}>Delete</Link>
                                    <Link className="btn btn-outline-success mx-1" to={`details/${e._id}`}>Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}