import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import Profile from './components/Profile'

function App() {

  axios.defaults.baseURL = 'http://localhost:5000'
  axios.defaults.withCredentials = true

  return (
    <div className="App">
      <header>
        <nav className='container'>
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav> 
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
