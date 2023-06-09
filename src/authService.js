import axios from 'axios';

class AuthService {
  login(credentials) {
    return axios.post('http://localhost:8082/api/auth/login', credentials)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }
}

export default new AuthService();
