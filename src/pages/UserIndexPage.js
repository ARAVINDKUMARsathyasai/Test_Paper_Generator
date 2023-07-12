import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams ,Link} from 'react-router-dom';
import axios from 'axios';

export default function UserIndexPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')

  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNo: '',
  });


  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/Admin/user/${userId}`);
    setUser(result.data);
    console.log(user);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  }

  function menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    const toggleDiv = document.querySelector('.info');
    const togglePic = document.querySelector('.ppp');
    toggleMenu.classList.toggle('active');
    toggleDiv.classList.toggle('active');
    togglePic.classList.toggle('active');
  }

  if (!userId) {
    return  (
      <div className='container text-center'>
      <img src={require('../img/padlock.jpg')} style={{height:"250px",marginTop:'2%',borderRadius:'50%', background:'purple',padding:2}}></img>
      <br></br>
      <br></br>
      <h1>Access Denied</h1>
      <h5 style={{color:"#888888"}}>If you want to access this page login </h5>
      <div className='container ' style={{display:'inline'}}>
          <Link to={'/'} className='btn btn-warning' style={{marginRight:"40px",marginTop:"20px"}}>Home</Link>
          <Link to={'/userLogin'} className="btn btn-primary" style={{marginTop:"20px"}}>Login</Link>
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
              <img src={'capstone.png'} alt="Capstone Logo" width="30px" height="30px" style={{ borderRadius: '50%', border: '2px solid gold' }} />
            </span>

            <span>TPG</span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="/activeTests">
                <span className="fa-solid fa-file-alt"></span>
                <span>Active Test</span>
              </a>
            </li>
            <li>
              <a href="/userReport">
                <span className="fa-solid fa-question-circle"></span>
                <span>Test Reports</span>
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
                <span>Welcome Back</span>
                <span>{user.username.substring(0, user.username.indexOf(' '))} !</span>
              </span>
            </label>
          </h2>
          <div className="user-wrapper">
            <img
              onClick={menuToggle}
              src={'capstone.png'}
              width="45px"
              height="45px"
              className="ppp"
            />
            <div onClick={menuToggle} className="info">
              <h6>{user.username.substring(0, user.username.indexOf(' '))}</h6>
              <small>User</small>
            </div>
          </div>
        </header>

        <main>
          <div id="homecontainer">
            <div id="sideImg">
              <img src={require('../img/student.png')} />
            </div>
            <div id="contentSection">
              <img src={'capstone.png'} />
              <b>
                <h17>TPG</h17>
              </b>
              <b>
                <p>
                  Test Paper Generator
                  <br />
                  "Empowering educators and
                  <br />
                  learners with the smartest way to create and excel through{" "}
                  <br />
                  Test Paper Generator."
                </p>
              </b>
              <button action="" id="button">
                EXPLORE
              </button>
            </div>
          </div>
          <div className="cont">
            <div className="menu">
              <h3>
                USER <br />
                <span>{user.username}</span>
              </h3>
              <ul>
                <li>
                  <img src={require('../img/homee.png')} />
                  <a href="/userIndex">Home</a>
                </li>
                <li>
                  <img src={require('../img/SignOut.png')} />
                  <a onClick={handleClick}>Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}