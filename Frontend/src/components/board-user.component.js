import React, { Component } from "react";
import axios from "axios";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import EventBus from "../common/EventBus";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.handleAttendRequest = this.handleAttendRequest.bind(this);
    this.onChangeVaccineStatus = this.onChangeVaccineStatus.bind(this);
    this.getUpdatedClassList = this.getUpdatedClassList.bind(this);


    this.state = {
      userid:"",
      username: "",
      vaccineStatus: "Fully Vaccinated",
      isFormSubmitted: false,
      submitMessage: "",
      onSubmitColor: "danger",
      classList:[]
    };

  }

  onChangeVaccineStatus(e) {
    this.setState({
      vaccineStatus: e.target.value,
    });
  }

  getUpdatedClassList(){
    UserService.getClassList().then(
      response => {
        this.setState({
          classList: response.data
        });
      },
      error => {
        this.setState({
          classList:
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

  componentDidMount() {
    this.getUpdatedClassList();

    const currentUser = AuthService.getCurrentUser();
    this.setState({
      userid:currentUser.id,
      username:currentUser.username
    });

  }

  handleAttendRequest(e){
    e.preventDefault();
    const clickedClass = this.state.classList.filter((element)=>element._id===e.target.value)[0];



    const availableSeats = clickedClass.emptySeats;

    if(availableSeats===0){
      this.setState({
        isFormSubmitted:true,
        submitMessage: "No seats available. All are booked",
        onSubmitColor: "danger"
      });
      return;
    }

    if(this.state.vaccineStatus === "Not Vaccinated"){
      this.setState({
        isFormSubmitted:true,
        submitMessage: "Sorry! Only vaccinated students allowed",
        onSubmitColor: "danger"
      });
      return;
    }



    var request = {
      username : this.state.username,
      userid: this.state.userid,
      date: clickedClass.date,
      day: clickedClass.day,
      subject: clickedClass.subject,
      vaccineStatus: this.state.vaccineStatus
    }

    axios.post("http://localhost:8080/api/attendRequests",request)
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("attendRequest", JSON.stringify(response.data));
      }
      this.setState({
        isFormSubmitted:true,
        submitMessage: response.data.message,
        onSubmitColor: response.data.colour
      });      
    });

    const updatedClass = {
      date: clickedClass.date,
      day: clickedClass.day,
      subject: clickedClass.subject,
      emptySeats : clickedClass.emptySeats - 1
    }

    const classId = clickedClass._id;
    const URL = "http://localhost:8080/api/tutorials/" + classId.toString();

    axios.put(URL,updatedClass)
    .then(response => {
      this.getUpdatedClassList();
    });


  }


  render() {
    const classList = this.state.classList;
    return (
      
      <div className="container">

            <div className="form-group">
              <label htmlFor="vaccineStatus">Choose your vaccination Status : </label>
              <select 
                className="form-control" 
                name="vaccineStatus"
                onChange={this.onChangeVaccineStatus}
              >
                <option value="Fully Vaccinated">Fully Vaccinated</option>
                <option value="Partially Vaccinated">Partially Vaccinated</option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </select>
            </div>

          {(classList.length>0) ?
            <div className="container jumbotron">
              <h3>Class</h3>
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Subject</th>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Available Seats</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classList.map(request => (
                    <tr key={request._id}>
                      <td>{request.subject}</td>
                      <td>{request.day}</td>
                      <td>{request.date}</td>
                      <td>{request.emptySeats}</td>
                      <td>
                        <button 
                        onClick={this.handleAttendRequest} 
                        value={request._id}
                        className="btn btn-outline-primary">
                          Book
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>: <div><h3>Sorry! No class Available</h3></div>}




        {this.state.isFormSubmitted ?
        <div>
          <header className={"alert alert-"+this.state.onSubmitColor} >
            <h3>{this.state.submitMessage} </h3>
          </header>
        </div>: null}
          
        
      </div>
    );
  }
}