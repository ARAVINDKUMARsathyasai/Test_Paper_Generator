import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams,Link } from 'react-router-dom';
import axios from 'axios';

export default function EditSubject() {
  const navigate = useNavigate();
  const { subId } = useParams();

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };

  const getEmail = localStorage.getItem('emailData');
  const getName = localStorage.getItem('nameData');

  const [subject, setSubject] = useState({
    title: '',
    description: ''
  });

  const { title, description } = subject;

  const onInputChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/subject/`, subject);
    navigate('/adminSubject');
  };

  const loadSubject = async () => {
    const result = await axios.get(`http://localhost:8080/subject/${subId}`);
    setSubject(result.data);
  };

  useEffect(() => {
    loadSubject();
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
              <a href="/adminSubject" className="active">
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
                <span>Subjects</span>
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
                <h3 className="text-center">Edit Subject</h3>
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="Title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the subject name"
                      name="title"
                      value={title}
                      required
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter the description"
                      name="description"
                      rows={8}
                      value={subject.discription}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    style={{
                      fontFamily: 'Imprint Mt Shadow',
                      borderRadius: '10px'
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
