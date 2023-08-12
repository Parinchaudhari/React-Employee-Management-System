import React, { Component } from 'react'
import { Link,to } from 'react-router-dom'



export default class Navbar extends Component {
    render() {
        return (
            <div className="nav">
                <h3>Employee Management</h3>
                <div className="links">
                {/* setting the links in navbar for the user to navaigate */}
                <Link className='sm-links'  to="/">Home</Link>
                <Link  className='sm-links' to="/create">Create</Link>
                <Link  className='sm-links' to="/filter">Filter</Link>
                <Link  className='sm-links' to="/RetirementTable">Retiries</Link>

                </div>
            </div>
        )
    }
}
