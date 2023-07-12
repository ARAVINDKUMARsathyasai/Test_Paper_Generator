import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AdminUserRepots() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [tests, setTests] = useState([]);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNo: '',
  });


  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/Admin/user/${id}`);
    setUser(result.data);
    console.log(user);
  };

  useEffect(() => {
    fetchTests();
    loadUser();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/test/');
      setTests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };


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
              <img  
                  src="/capstone.png"
                  alt="Capstone Logo"
                  width="30px"
                  height="30px"
                  style={{ borderRadius: '50%', border: '2px solid gold' }}/>
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
                <span>{user.username}'s Results</span>
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
        <div className="car-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tests.length === 0 ? (
              <div className='empty-message text-center' style={{ marginTop: '10%', marginLeft: '43%' }}>
                <img src={require('../img/noData.png')} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', borderColor: 'red', borderWidth: '6px' }} />
                <h3>No tests found !</h3>
                <p>There are no active tests available.</p>
              </div>
            ) : (
              tests.map((test) => (
                <div className="cad" onClick={() => navigate(`/userReports/${id}/test/${test.qId}`)}  key={test.qId} style={{ padding: '10px', position: 'relative', width: 'calc(33.33% - 20px)', margin: '10px' }}>
                  <div style={{ display: 'initial' }}>
                    <div className="card-image" style={{ marginRight: '10px', display: 'inline-block' }}>
                      <img src={require('../img/reports.png')} style={{ width: '50px', height: '50px', objectFit: 'cover', marginBottom: '50%', borderRadius: '50%', background: 'gold', padding: 2 }} />
                    </div>
                    <div className="card-content" style={{ display: 'inline-block' }}>
                      <div>
                        <h5 style={{ marginBottom: '5px' }}>{test.title}</h5>
                      </div>
                      <p style={{ color: 'gray' }}>{test.subject.title}</p>
                    </div>
                    <p className='truncate'>{test.disc}</p>
                  </div>
                </div>
              ))
            )}
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
