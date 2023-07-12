import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams ,Link} from 'react-router-dom';
import axios from 'axios';

export default function EditUser() {
  const navigate = useNavigate();
  const { id} = useParams();

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };

  const getEmail = localStorage.getItem('emailData');
  const getName = localStorage.getItem('nameData');
  const [validationError, setValidationError] = useState('');

  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNo: '',
  });

  const { username, email, phoneNo } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'phoneNo') {
      if (!/^[6-9]\d{9}$/.test(value)) {
        setValidationError(
          'Phone number should have exactly 10 digits and start with 6, 7, 8, or 9.'
        );
      } else {
        setValidationError('');
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/Admin/user/${id}`, user);
    setUser({ username: '', email: '', phoneNo: '' });
    setValidationError('');
    navigate('/allUsers');
    window.location.reload(); // Refresh the screen
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/Admin/user/${id}`);
    setUser(result.data);
    console.log(user);
  };

  useEffect(() => {
    loadUser();
  }, []);

  function menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    const toggleDiv = document.querySelector('.info');
    const togglePic = document.querySelector('.ppp');
    toggleMenu.classList.toggle('active');
    toggleDiv.classList.toggle('active');
    togglePic.classList.toggle('active');
  }

  if (!getEmail || !getName) {
    return  (
      <div className='container text-center'>
      <img src={require('../img/padlock.jpg')} style={{height:"250px",marginTop:'2%',borderRadius:'50%', background:'purple',padding:2}}></img>
      <br></br>
      <br></br>
      <h1>Access Denied</h1>
      <h5 style={{color:"#888888"}}>If you want to access this page login </h5>
      <div className='container ' style={{display:'inline'}}>
          <Link to={'/'} className='btn btn-warning' style={{marginRight:"40px",marginTop:"20px"}}>Home</Link>
          <Link to={'/adminLogin'} className="btn btn-primary" style={{marginTop:"20px"}}>Login</Link>
      </div>
      </div>
    );
  }
  
    return (
      <>
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h2>
              <span>
                <img
                  src="/capstone.png"
                  alt="Capstone Logo"
                  width="30px"
                  height="30px"
                  style={{ borderRadius: '50%', border: '2px solid gold' }}
                />
              </span>
  
              <span>TPG</span>
            </h2>
          </div>
          <div className="sidebar-menu">
            <ul>
              <li>
                <a href="/adminDashboard">
                  <span className="fas fa-desktop"></span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/allUsers" className="active">
                  <span className="fa-solid fa-user-graduate"></span>
                  <span>Users</span>
                </a>
              </li>
              <li>
                <a href="/adminTests">
                  <span className="fa-solid fa-file-alt"></span>
                  <span>Tests</span>
                </a>
              </li>
              <li>
                <a href="/adminSubject">
                  <span className="fas fa-book"></span>
                  <span>Subjects</span>
                </a>
              </li>
              <li>
                <a href="/adminQuestion">
                  <span className="fas fa-question"></span>
                  <span>Questions</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="main-content">
          <header>
            <h2>
              <label htmlFor="nav-toggle">
                <span className="las la-bars">
                  <span>Update user</span>
                </span>
              </label>
            </h2>
            <div className="user-wrapper">
              <img
                onClick={menuToggle}
                src="/capstone.png"
                alt="Capstone Logo"
                width="45px"
                height="45px"
                className="ppp"
              />
              <div onClick={menuToggle} className="info">
                <h6>{getName.substring(0, getName.indexOf(' '))}</h6>
                <small>Admin</small>
              </div>
            </div>
          </header>
  
          <main>
          <div className="container">
            <div className="row">
              <div className="border rounded">
                <h3 className="text-center" style={{fontSize:'28px',fontWeight:800}}>-: Edit User :-</h3>
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter the user name"
                      name="username"
                      value={username}
                      required
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email address"
                      name="email"
                      value={email}
                      required
                     onChange={onInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNo"
                      placeholder="Enter the phone number"
                      name="phoneNo"
                      value={phoneNo}
                      required
                      onChange={onInputChange}
                    />
                    {validationError && (
                      <div className="text-danger">{validationError}</div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    style={{
                      fontFamily: 'Imprint Mt Shadow',
                      borderRadius: '10px',
                    }}
                    className="btnn btn-primary mb-3 text-center"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
            <div className="cont">
              <div className="menu">
                <h3>
                  ADMIN <br />
                  <span>{getName}</span>
                </h3>
                <ul>
                  <li>
                    <img src={require('../img/homee.png')} alt="Home" />
                    <a href="/admin-index">Home</a>
                  </li>
                  <li>
                    <img src={require('../img/edit.png')} alt="Developer Info" />
                    <a href="/developerInfo">Developer info</a>
                  </li>
                  <li>
                    <img src={require('../img/SignOut.png')} alt="Sign Out" />
                    <a onClick={handleClick}>Sign Out</a>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </>
    );
}
