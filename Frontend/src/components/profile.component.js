import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      attendRequest: []
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    const attendRequest = this.state.attendRequest.filter(item => item.username.includes(currentUser.username));


    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron text-center" >
          <h3>
            Hello!  <strong>{currentUser.username.toUpperCase()}</strong> 
          </h3>
        </header>
        
        </div>: null}
      
        {(attendRequest.length>0) ?
        <div>
          <header className="jumbotron" >
            <h3>Your Approved Requests </h3>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Day</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendRequest.map(request => (
                      
                      <tr key={request._id}>
                        <td>{request.subject}</td>
                        <td>{request.day}</td>
                        <td>{request.date}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
          </header>
        </div>: null}


      </div>
    );
  }
}
