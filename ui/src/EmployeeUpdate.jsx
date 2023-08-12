import React, { Component } from 'react'
export default class EmployeeUpdate extends Component {
  constructor() {
    super()
    //creeating the state for storing the value of a single employee
    this.state = {
      _id: {
        value: ""
      },
      fname: {
        value: ""
      },
      lname: {
        value: ""
      },
      age: {
        value: ""
      },
      joindate: {
        value: ""
      },
      title: {
        value: ""
      },
      department: {
        value: ""
      },
      employeetype: {
        value: ""
      },
      currentstatus: {
        value: ""
      }
    }
    //bing the on change function
    this.handleOnchange = this.handleOnchange.bind(this)
  }
  //on change function to get the value of changeable field and updating the state 
  handleOnchange(e) {
    console.log("i am handke on change")
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value: value
      }
    })
  }
  //update employee is used to update the data when the form is submitted
  updateEmployee = async (e) => {
    //preventing the degault behaviour of the form
    e.preventDefault()
    console.log("i am update employee")
    //storing the value of updated filed in and variable
    let variables = {
      inpup: {
        _id: this.state._id.value,
        fname: this.state.fname.value,
        lname: this.state.lname.value,
        age: this.state.age.value,
        joindate: this.state.joindate.value,
        title: this.state.title.value,
        department: this.state.department.value,
        employeetype: this.state.employeetype.value,
        currentstatus: this.state.currentstatus.value,
      }
    }
    //graph ql query for updating the data
    let query = `mutation Mutation($inpup: updateType!) {
      updateEmployee(inpup: $inpup) {
        fname
        lname
        age
        joindate
        title
        department
        currentstatus
        employeetype
        _id
      }
    }`

    //making a api call using graphql and the data is being passed for the reslovers to update the data
    await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    }).then(res => {
      alert("updated Successfully")
    }).catch(error => {
      alert("Cannot Add Data Try Again")
      console.log(error)
    })

    window.location.href = '/';
  }
  //setting the initial value of state with the userid passed in url 
  componentDidMount() {
    console.log("i am did mount in update")
    //getting userid from url
    const ip = window.location.href.split('/')[4]
    //setting the data of url id to varibales
    let variables = {
      ip
    }
    console.log(ip)
    //query to fetch details of id passed in url
    let query = `query GetUniqueEmp($ip: String!) {
      getUniqueEmp(ip: $ip) {
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
      body: JSON.stringify({ query, variables })
    }).then(res => res.json()).then(data => {
      console.log("write worked")
      console.log(data.data.getUniqueEmp)
      this.setState({
        _id: {
          value: data.data.getUniqueEmp._id
        },
        fname: {
          value: data.data.getUniqueEmp.fname
        },
        lname: {
          value: data.data.getUniqueEmp.lname
        },
        age: {
          value: data.data.getUniqueEmp.age
        },
        joindate: {
          value: data.data.getUniqueEmp.joindate
        },
        title: {
          value: data.data.getUniqueEmp.title
        },
        department: {
          value: data.data.getUniqueEmp.department
        },
        employeetype: {
          value: data.data.getUniqueEmp.employeetype
        },
        currentstatus: {
          value: data.data.getUniqueEmp.currentstatus
        }
      })
    }).catch(error => {
      console.log("cananot")
      // alert("Cannot Add Data Try Again")
    })
  }
  render() {
    console.log(this.state)
    return (
      <>
        <h1 className="ts">Update Employee Form</h1>
        <div className='center'>
          <div className="forms">
            <form className="row g-3" >
              <div className="data">

                <div className="inpdata" >
                  <label htmlFor="fname" className="form-label">First Name</label>
                  <input type="text" className="form-control" value={this.state.fname.value} id="fname" disabled />
                </div>
                <div className="inpdata" >
                  <label htmlFor="lname" className="form-label">Last Name</label>
                  <input type="text" className="form-control" value={this.state.lname.value} id="lname" disabled />
                </div>

              </div>
              <div className="data">

                <div className="inpdata" >
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="number" className="form-control" value={this.state.age.value} id="age" disabled />
                </div>
                <div className="inpdata" >
                  <label htmlFor="joindate" className="form-label">Joinging Date</label>
                  <input type="text" className="form-control" value={this.state.joindate.value} id="joindate" disabled />
                </div>
              </div>

              <div className="data">

                <div className="inpdata" >
                  <label htmlFor="title" className="form-label">Title</label>
                  <select id="title" value={this.state.title.value} onChange={this.handleOnchange} name="title" className="form-select">
                    <option value="Employee" >Employee</option>
                    <option value="Manager" >Manager</option>
                    <option value="Director" >Director</option>
                    <option value="VP" >VP</option>
                  </select>
                </div>
                <div className="inpdata" >
                  <label htmlFor="title" className="form-label">Department</label>
                  <select id="department" value={this.state.department.value} onChange={this.handleOnchange} name='department' className="form-select">
                    <option value="IT" >IT</option>
                    <option value="Marketing" >Marketing</option>
                    <option value="HR" >HR</option>
                    <option value="Engineering" >Engineering</option>
                  </select>
                </div>
                <div className="inpdata" >
                  <label htmlFor="title" className="form-label">Employee Type</label>
                  <select id="employeetype" className="form-select" value={this.state.employeetype.value} disabled>
                    <option value="FullTime" >Full Time</option>
                    <option value="PartTime" >Part Time</option>
                    <option value="Seasonal" >Seasonal</option>
                    <option value="Contract" >Contract</option>
                  </select>
                </div>
              </div>
              <div className="inpdata" >
                <label htmlFor="title" className="form-label">Current Status</label>
                <select className="form-select" value={this.state.currentstatus.value} onChange={this.handleOnchange} id="currentstatus" name='currentstatus' required>
                  <option value="1" >1</option>
                  <option value="0" >0</option>
                </select>
              </div>
              {/* <div className="inpdata" >
                <label htmlFor="currentstatus" className="form-label">Current Status</label>
                <input type="text" className="form-control" value={this.state.currentstatus.value} onChange={this.handleOnchange} id="currentstatus" name='currentstatus' required />
              </div> */}
              <div>

                <button type="submit" onClick={this.updateEmployee} className="btn">Update Employee</button>

              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}
