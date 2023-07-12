import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/adminIndex.css';
import '../styles/SliderButton.css';
import swal from 'sweetalert';

function AdminTest() {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/test/');
      setTests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'You want to update the active status',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:8080/test/disable/${id}`)
          .then(() => {
            fetchTests();
            swal('Test active status updated!', {
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error in updating:', error);
            swal('Oops!', 'Number of questions exceeds the available questions.', 'error');
          });
      } else {
        swal('Test active status retained !!');
      }
    });
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
      <br/>
      <br/>
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
              <a href="/adminTests" className="active">
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
                <span>All Tests</span>
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
        <div className="coontainer text-center mt-20" style={{ marginBottom: '2%',marginLeft:'90%'}}>
            <Link   className="btnn" style={{ width: '150px',padding:10 }} to={'/AddTest'}>Add New Test</Link>
          </div>
          <hr/>
        <div className="car-containe">
  {tests.map((test) => (
    <div className="cad" key={test.qId} style={{ padding: '10px', position: 'relative' }}>
      <label
              className="slider-button"
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              <input
                type="checkbox"
                checked={test.active}
                onChange={() => updateStatus(test.qId)}
              />
              <span className="slider"></span>
            </label>
              <div style={{ display: 'initial' }}>
                <div className="card-image" style={{ marginRight: '10px', display: 'inline-block' }}>
                  <img src={require('../img/test.png')} style={{ width: '50px', height: '50px', objectFit: 'cover', marginBottom: '50%', borderRadius: '50%' ,background:'gold',padding:2}} />
                </div>
                <div className="card-content" style={{ display: 'inline-block' }}>
                  <div>
                    <h5 style={{ marginBottom: '5px',fontWeight:'bold' }}>{test.title}</h5>
                  </div>
                  <p style={{color:'gray'}}>{test.subject.title}</p>
                </div>
                <p>{test.disc}</p>
                <div>
                  <button className="btn btn-primary" style={{ background: 'white', color: '#d40219', marginRight: '2%' }}>Max Marks {test.maxMarks}</button>
                  <button className="btn btn-primary" style={{ background: 'white', color: '#d40219', marginRight: '2%' }}>Questions: {test.numberOFQuestions}</button>
                  <Link to={`/testQuestion/${test.qId}`} className="btn btn-primary" style={{ background: 'orange', marginRight: '2%' }}>Questions</Link>
                  <Link to={`/editTest/${test.qId}`} className="btn btn-primary" style={{ background: 'orange', marginRight: '2%' }}>Update</Link>
                </div>
              </div>
            </div>
          ))}
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

export default AdminTest;
