import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const attendRequest_API_URL = 'http://localhost:8080/api/attendRequests';
const tutorial_API_URL = 'http://localhost:8080/api/tutorials'

class UserService {
  submitAttendRequest(){
    return axios.post(attendRequest_API_URL + '/', { 
      headers: authHeader() ,
      
    });
  }

  getAllAttendRequest(){
    return axios.get(attendRequest_API_URL + '/', { 
      headers: authHeader() ,
      
    });
  }

  getClassList(){
    return axios.get(tutorial_API_URL + '/', { 
      headers: authHeader() ,
      
    });
  }

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
