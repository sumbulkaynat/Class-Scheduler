import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendRequest: []
    };
  }

  componentDidMount() {

    UserService.getAllAttendRequest().then(
      response => {
        this.setState({
          attendRequest: response.data
        });
        //console.log(this.state.attendRequest);
      },
      error => {
        this.setState({
          attendRequest:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    
  }

  render() {
    const attendRequest = this.state.attendRequest;
    return (
      <div className="container">
        <header className="jumbotron">

            {(attendRequest.length>0) ?
            <div>
              <h3>Approved Students</h3>
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Subject</th>
                    <th>Day</th>
                    <th>Student Name</th>
                    <th>Vaccination Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendRequest.map(request => (
                    <tr key={request._id}>
                      <td>{request.subject}</td>
                      <td>{request.day}</td>
                      <td>{request.username}</td>
                      <td>{request.vaccineStatus}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>: <div><h3>No Approved Request</h3></div>}

          
        </header>
      </div>
    );
  }
}
