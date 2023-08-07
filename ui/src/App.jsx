import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import EmployeeDirectory from './EmployeeDirectory.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <EmployeeDirectory/>
      </Router>

    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

