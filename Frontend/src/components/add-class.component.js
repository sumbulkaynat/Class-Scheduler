import React, { Component } from "react";
import axios from "axios";

export default class AddClass extends Component {
  constructor(props) {
    super(props);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeSeats = this.onChangeSeats.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);



    this.state = {
      subject: '',
      day: '',
      date: '',
      emptySeats: 0,
      isFormSubmitted: false,
      submitMessage: "",
      onSubmitColor: "danger"
    };
  }

  onChangeSubject(e){
      this.setState({
        subject: e.target.value,
      });
  }

  onChangeDate(e){
    this.setState({
      date: e.target.value,
    });
  }

    onChangeDay(e){
        this.setState({
        day: e.target.value,
        });
    }


    onChangeSeats(e){
        this.setState({
        emptySeats: e.target.value,
        });
    }

    handleSubmit(e){
        e.preventDefault();

        const data = {
            subject: this.state.subject,
            day: this.state.day,
            date: this.state.date,
            emptySeats: this.state.emptySeats
        }

        axios.post('http://localhost:8080/api/tutorials/',data)
        .then(response => {
            this.setState({
                isFormSubmitted:true
            }); 
              if(response.status===200){
                this.setState({
                    submitMessage: "Successfully created the class.",
                    onSubmitColor: "success"
                  });
              }else{
                this.setState({
                    submitMessage: "An error Occured!!",
                    onSubmitColor: "danger"
                });
                
              }          
        });
       
    }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
        <form>

            <div className="form-group">
                <label htmlFor="subject">Subject </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="subject" 
                    onChange= {this.onChangeSubject}
                    required
                    placeholder="Enter Subject here"/>
            </div>

            <div className="form-group">
                <label htmlFor="day">Day </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="day" 
                    onChange= {this.onChangeDay}
                    required
                    placeholder="Enter Day here"/>
            </div>

            <div className="form-group">
                <label htmlFor="date">Date </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="date" 
                    onChange= {this.onChangeDate}
                    required
                    placeholder="Enter Date here"/>
            </div>

            <div className="form-group">
                <label htmlFor="emptySeats">Empty Seats </label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="emptySeats" 
                    onChange= {this.onChangeSeats}
                    required
                    placeholder="0"/>
            </div>

            <button 
                onClick={this.handleSubmit} 
                className="btn btn-outline-primary">
                Add Class
            </button>
            

        </form>  
        </header>
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
