import React, { Component } from 'react'

export default class EmployeeFilter extends Component {
    constructor() {
        super()
        //setting the state of the dataa of users which we got from the props
        this.state = {
            data: [],
            fdata: [],
            filterParams: "FullTime"
        }
    }

    //setting the filter paratmeter for employee type so the data can be filter according to the employee type
    handleOnchange = (e) => {
        const { value } = e.target;
        this.setState({
            filterParams: value
        })


    }
    //handing the click event for filter the dtaa as per the porvided "filter params"
    handleClick = (e) => {
        e.preventDefault()
        console.log("clciked")
        console.log(this.state.fdata)
        let filters = this.state.data.filter(e => e.employeetype == this.state.filterParams)
        console.log(filters)
        this.setState({
            fdata: filters
        })

    }
    //setting the state value with the data of emloyee got as props from the main component before the component get mount
    componentDidMount() {
        // console.log("called filetr"+this.props.filterData)
        this.setState({
            data: this.props.filterData,
            fdata: this.props.filterData
        })
    }
    render() {
        // console.log(this.state)
        return (
            <>
                <div className="filter-form">
                    <form className="row g-3" onSubmit={this.handledata}>
                        <div className="data">

                            <div className="inpdata" >
                                <label htmlFor="title" className="form-label">Filter Data using Employee Type</label>
                                <select id="employeetype" className="form-select" name='filterParams' onChange={this.handleOnchange}>
                                    <option value="FullTime" >Full Time</option>
                                    <option value="PartTime" >Part Time</option>
                                    <option value="Seasonal" >Seasonal</option>
                                    <option value="Contract" >Contract</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <button type="submit" onClick={this.handleClick} className="btn">Filter Employee</button>

                        </div>
                    </form>
                </div>
                <div className="center">
                    <table>
                        <caption>Filtered Employee List Based</caption>
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
                            {this.state.fdata.map((e, i) => {

                                return <tr key={e._id}>
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
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
