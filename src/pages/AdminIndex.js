import React from "react";
import { useNavigate,Link } from 'react-router-dom';
import '../styles/adminIndex.css';


function AdminIndex() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  }

  const getEmail = localStorage.getItem('emailData');
  const getName = localStorage.getItem('nameData');

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
              <img src={'capstone.png'} alt="Capstone Logo" width="30px" height="30px" style={{ borderRadius: '50%', border: '2px solid gold' }} />
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
              <a href="/allUsers">
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
                <span>Welcome Back</span>
                <span>{getName.substring(0, getName.indexOf(' '))}</span>
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
              <h6>{getName.substring(0, getName.indexOf(' '))}</h6>
              <small>Admin</small>
            </div>
          </div>
        </header>

        <main>
          <div id="homecontainer">
            <div id="sideImg">
              <img src={require('../img/adminIndex.png')} />
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
                ADMIN <br />
                <span>{getName}</span>
              </h3>
              <ul>
                <li>
                  <img src={require('../img/homee.png')} />
                  <a href="/admin-index">Home</a>
                </li>
                <li>
                  <img src={require('../img/edit.png')} />
                  <a href="/developerInfo">Developer info</a>
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
  );
}

export default AdminIndex;
