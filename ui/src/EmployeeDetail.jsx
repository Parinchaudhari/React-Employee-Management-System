import React, { Component } from 'react'
import { Container, Table } from 'react-bootstrap';


export default class EmployeeDetail extends Component {
    constructor() {
        super()
        //creating the state for storing the data
        this.state = {
            fname: "",
            lname: "",
            age: "",
            joindate: "",
            title: "",
            department: "",
            employeetype: "",
            currentstatus: "",
            retirmentdate: "",
            countdowndays: "",
            countdownmonths: "",
            countdownyears: ""
        }
    }
    //function to calulate the retirment and countdown left for the retirement
    calulatedatae = (age, joindate) => {
        //checking the data we get is correct or not
        console.log(age, joindate)
        //calulating the current date
        const currentDate = new Date();
        //creatingt a new datae varibale for the join date
        const jDate = new Date(joindate);
        // differcne of current date and joindate will gice the number of milisends that the employee worked in company till today's date
        const timeDifference_miliseconds = currentDate - jDate;

        // Calculate the timeworkded in office (which are in liliseconds) in days
        const days_worked_office = Math.floor(timeDifference_miliseconds / (1000 * 60 * 60 * 24));
        //chekcing the caluclated days
        console.log(days_worked_office + "days worked")
        //calulating the todatal age of employee in company by adding the age of the employee when joined to the number of daus workded till today
        let current_age_indays = parseInt(days_worked_office) + parseInt(age * 365)
        console.log(current_age_indays)

        //claulating the retirment days left by subtracting the reirment age (65) from the current age of the employee
        let retirement_days_left = 65 * 365 - current_age_indays
        console.log(retirement_days_left + "h")

        //create a new date varibale 
        const newDate = new Date();
        console.log(newDate.getDate() + " get date")
        //finding the final retirment date by addding no of days for reitrmnt left to the current date
        newDate.setDate(newDate.getDate() + retirement_days_left);
        console.log(newDate + "newdate")
        //convering the date frmat to locaL string 
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let final_retirment_date = newDate.toLocaleString('en-US', options)
        console.log(final_retirment_date)

        //creating new date varibale with current date and retirement date 
        const startDate_countdown = new Date(currentDate);
        const endDate_countdown = new Date(final_retirment_date);

        //calulating the no of years,days and months left in retirement 
        let yearDiff = endDate_countdown.getFullYear() - startDate_countdown.getFullYear();
        let monthDiff = endDate_countdown.getMonth() - startDate_countdown.getMonth();
        let dayDiff = endDate_countdown.getDate() - startDate_countdown.getDate();

        //if days is negative
        if (dayDiff < 0) {
            monthDiff--;
            const tempDate = new Date(endDate_countdown.getFullYear(), endDate_countdown.getMonth() - 1, 0);
            dayDiff += tempDate.getDate();
        }
        //if monthsdiff is less than zero
        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }

        console.log(`Years: ${yearDiff}`);
        console.log(`Months: ${monthDiff}`);
        console.log(`Days: ${dayDiff}`);
        //setting the coundown to state
        this.setState({
            countdowndays: dayDiff,
            countdownmonths: monthDiff,
            countdownyears: yearDiff
        })
        return final_retirment_date

    }
    componentDidMount() {
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
        // feetch api request
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        }).then(res => res.json()).then(data => {
            console.log("write worked")
            console.log(data.data.getUniqueEmp)
            this.setState({
                fname: data.data.getUniqueEmp.fname,
                lname: data.data.getUniqueEmp.lname,
                age: data.data.getUniqueEmp.age,
                joindate: data.data.getUniqueEmp.joindate,
                title: data.data.getUniqueEmp.title,
                department: data.data.getUniqueEmp.department,
                employeetype: data.data.getUniqueEmp.employeetype,
                currentstatus: data.data.getUniqueEmp.currentstatus,
                retirmentdate: this.calulatedatae(data.data.getUniqueEmp.age, data.data.getUniqueEmp.joindate)
            })
        })
    }
    render() {
        return (
            <Container className="d-flex align-items-start justify-content-center my-4" style={{ minHeight: '100vh' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan="10" className="text-center fs-2">Employee List</th>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Date Of Joining</th>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Employee Type</th>
                            <th>Current Status</th>
                            <th>Retirement Date</th>
                            <th>Countdown</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.fname}</td>
                            <td>{this.state.lname}</td>
                            <td>{this.state.age}</td>
                            <td>{this.state.joindate}</td>
                            <td>{this.state.title}</td>
                            <td>{this.state.department}</td>
                            <td>{this.state.employeetype}</td>
                            <td>{this.state.currentstatus}</td>
                            <td>{this.state.retirmentdate}</td>
                            <td>Years: {this.state.countdownyears} Months: {this.state.countdownmonths} Days: {this.state.countdowndays}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}
