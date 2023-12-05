import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Employee Create Component
export default class EmployeeCreate extends Component {
    constructor() {
        super()
        //create state for the taking values and for validaitons
        this.state = {
            fname: {
                value: '',
                error: false,
            },
            lname: {
                value: '',
                error: false,
            },
            age: {
                value: 0,
                error: false,
            }
        }

        //binding all the fucntion
        this.fnameonchange = this.fnameonchange.bind(this)
        this.lnameonchange = this.lnameonchange.bind(this)
        this.ageonchange = this.ageonchange.bind(this)
        this.handledata = this.handledata.bind(this)
    }

    //below fucntion is used to checkn errors for first name
    fnameonchange(e) {
        // console.log("sdv") this consolelog is used to check the on change is working or not
        
        //validation for special character is done using regex
        const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        if (regex.test(e.target.value)) {
            // console.log("regexss")

            //setting the state of error if name has special character
            this.setState(pre => ({
                fname: {
                    ...pre.fname,
                    error: true
                }
            }))
            console.log(this.state.fname.error)
        }

        //setting the state of value if name does not have a special character
        else {
            this.setState({
                fname: {
                    value: e.target.value,
                    error: false
                }
            })
        }
        console.log(this.state.fname.value)
    }

    //below fucntion is used to checkn errors for last name
    lnameonchange(e) {

        //validation for special character is done using regex
        const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        if (regex.test(e.target.value)) {
            //setting the state of error if last name has special character
            this.setState(pre => ({
                lname: {
                    ...pre.lname,
                    error: true
                }
            }))
        }
        else {
            //setting the state of error if last name does not have a special character
            this.setState({
                lname: {
                    value: e.target.value,
                    error: false
                }
            })
        }
    }

    //validation for age is a noumber or not
    ageonchange(e) {

        //validation for value is number or not is done using regex
        const regex = /^\d+$/;

        //checking if value is number or not
        if (regex.test(e.target.value)) {
            // console.log("first condition")

            //checking if number is legal or not (between 20 and 70)
            if (e.target.value >= 20 && e.target.value <= 70) {
                // console.log("20 70")

                //setting the state for age if all thing are correct 
                this.setState({
                    age: {
                        value: e.target.value,
                        error: false
                    }
                })
            }
            else {
                // console.log("20 70 else")
                //setting the vaalue of state for ahe errror if their is an error if age is not between 20 to 70
                this.setState(pre => ({
                    age: {
                        ...pre.age,
                        error: true
                    }
                }))
            }
        }
        else {
            // console.log("totla else")
         //setting the vaalue of state for ahe errror if their is an error which is age is not a numberr
            this.setState(pre => ({
                age: {
                    ...pre.age,
                    error: true
                }
            }))
        }
    }
    //below function is used to convert the numerical date to US Date fomate for better understanding
    handledate(d) {

        //slitting the value got by (-)
        const dp = d.split("-");
        //seperating the data
        const year = parseInt(dp[0]);
        //we did -1 because month state from zero in programming(i e 0 is january,1 is febraury)
        const month = parseInt(dp[1]) - 1;
        const day = parseInt(dp[2]);

        const date = new Date(year, month, day);
        //converting it into US Date Format
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return formattedDate
    }


    //below funtion will handle the onsubmit of the form
    async handledata(e) {
        //checking condtion if all date are error free or not
        if (!this.state.fname.error && !this.state.lname.error && !this.state.age.error) {
            e.preventDefault();

            //create a data rom the dtaa of form we got for passing it into the query in graphql
            let variables = {
                inp: {

                    fname: this.state.fname.value,
                    lname: this.state.lname.value,
                    age: parseInt(this.state.age.value),
                    joindate: this.handledate(document.getElementById("joindate").value),
                    title: document.getElementById("title").value,
                    department: document.getElementById("department").value,
                    employeetype: document.getElementById("employeetype").value
                }
            }

            // query for the graphql to pricess the dtaa form the frontend so graphql
            let query = `mutation AddEmployee($inp: inpEmployee!) {
                addEmployee(inp: $inp) {
                fname
                lname
                age
                joindate
                title
                department
                employeetype
                }
            }`

            //using the fetch  api to send the data from the front end and graphql  can handle the endpoint it
            await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables })
            }).then(res=>{
                alert("Data Added Successfully")
                window.location.reload()
            }).catch(error=>{
                alert("Cannot Add Data Try Again")
                console.log(error)
            })
        }
    }
    render() {
        return (
            <Container>
            <h1 className="ts my-4">Create Employee Form</h1>
            <Form onSubmit={this.handledata}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.fnameonchange}
                      isInvalid={this.state.fname.error}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      No Special Character is Valid
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.lnameonchange}
                      isInvalid={this.state.lname.error}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      No Special Character is Valid
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
    
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={this.ageonchange}
                      isInvalid={this.state.age.error}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Age Should be a Number and between 20 and 70
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Joining Date</Form.Label>
                    <Form.Control type="date" required id="joindate" />
                  </Form.Group>
                </Col>
              </Row>
    
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Select id="title">
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Director">Director</option>
                      <option value="VP">VP</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Select id="department">
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                      <option value="Engineering">Engineering</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Employee Type</Form.Label>
                    <Form.Select id="employeetype">
                      <option value="FullTime">Full Time</option>
                      <option value="PartTime">Part Time</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Contract">Contract</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
    
              {(!this.state.fname.error && !this.state.lname.error && !this.state.age.error) && (
                <Button type="submit" className="btn">
                  Add Employee
                </Button>
              )}
            </Form>
          </Container>
        )
    }
}
