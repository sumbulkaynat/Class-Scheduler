import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <header className="jumbotron bg-transparent text-center">
          <h1>Scheduler Web Application</h1>
          <img src="scheduler-img.jpg" className='img-fluid shadow-4' alt='...'/>
        </header>
      </div>
    );
  }
}
