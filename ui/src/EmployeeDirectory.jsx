import React, { Component } from 'react'
import EmployeeTable from "./EmployeeTable.jsx"
import EmployeeCreate from './EmployeeCreate.jsx'
import Navbar from "./Navbar.jsx"
import { Route, Routes} from 'react-router-dom'
import EmployeeUpdate from './EmployeeUpdate.jsx'
import EmployeeDelete from './EmployeeDelete.jsx'
import EmployeeFilter from './EmployeeFilter.jsx'
import RetirementTable from './RetirementTable.jsx'
import EmployeeDetail from './EmployeeDetail.jsx'
//Employee Directory Component(Parent Component)
export default class EmployeeDirectory extends Component {

    constructor() {
        super()
        //setting the sate for the empoyee data which later be set to data fetched from api
        this.state = {
            employees: [],
        }
        this.loadData = this.loadData.bind(this)
    }
    //calling the function dataload when component will be mounted
    componentDidMount() {
        this.loadData()
    }

    //fubction below will be used to call the api using fetch
    async loadData() {
        //graphql query yo fecth the dtaa from api using 
        let query = `query{
            getAllEmp {
              _id
              fname
              lname
              age
              joindate
              title
              department
              employeetype
              currentstatus
            }
          }`
        //hitiing the endpoint of api using fetch
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        //converting the data
        const result = await response.json();
        console.log(result) //console log is used to see we got corredc data
        //setting the state of the stae created earilier to the dtaa got from api
        this.setState({ employees: result.data.getAllEmp })
        console.log(this.state.employees)

    }
    render() {
        return (
            <>
                    <Navbar />
                    {/* all the componenets called insde the main component */}
                    {/* <EmployeeCreate /> */}
                    {/* passing the data as pros of all empoyees to table component so that it can be dislayed in table  */}
                    {/* <EmployeeTable empdata={this.state.employees} /> */}
                    {/* <Link to="/create">Create Page</Link> */}
                    
                    {/* Setting up routes and passing the data as props to the componenets */}
                    <Routes>
                        <Route path='/' element={<EmployeeTable empdata={this.state.employees} />}/>
                        <Route path='/create' element={<EmployeeCreate/>}/>
                        <Route path='/update/:uid'  element={<EmployeeUpdate/>}/>
                        <Route path='/delete/:uid'  element={<EmployeeDelete/>}/>
                        <Route path='/filter'  element={<EmployeeFilter filterData={this.state.employees}/>}/>
                        <Route path='/RetirementTable'  element={<RetirementTable empdata={this.state.employees}/>}/>
                        <Route path='/details/:uid'  element={<EmployeeDetail/>}/>
                    </Routes>
            </>
        )
    }
}
