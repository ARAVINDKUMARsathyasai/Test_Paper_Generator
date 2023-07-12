import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/adminIndex.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';


function AdminIndex() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  const { subjectId } = useParams();

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };

  const getEmail = localStorage.getItem('emailData');
  const getName = localStorage.getItem('nameData');

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/subject/');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const deleteSubject = async (subId) => {
    swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this Data!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8080/subject/${subId}`)
            .then(() => {
              fetchSubjects();
              swal('Your data has been deleted!', {
                icon: 'success',
              });
            })
            .catch((error) => {
              console.error('Error deleting subject:', error);
              swal('Oops!', 'Something went wrong.', 'error');
            });
        } else {
          swal('Your data is safe!!');
        }
      });    
  };

  useEffect(() => {
    fetchSubjects();
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
      <div className='container text-center' >
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
                src={'capstone.png'}
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
              src={'capstone.png'}
              width="45px"
              height="45px"
              className="ppp"
              alt="Profile"
            />
            <div onClick={menuToggle} className="info">
              <h6>{getName.substring(0, getName.indexOf(' '))}</h6>
              <small>Admin</small>
            </div>
          </div>
        </header>

        <main>
          <div className="containers">
            {Array.isArray(subjects) && subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <div className="car" key={index}>
                  <div className="data">
                    <h1>{subject.title}</h1>
                    <p>{subject.discription}</p>
                  </div>
                  <img
                    src={require('../img/subjects.png')}
                    alt="subjects"
                  />
                  <div className="intro">
                    <div className="actions">
                      <Link
                        className="btn text-warning btn-act"
                        style={{ marginRight: '10%' }}
                        to={`/editsubject/${subject.subId}`}
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>

                      <button className="btn text-danger btn-act"
                      onClick={()=>deleteSubject(subject.subId)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No subjects found.</p>
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
                  <img src={require('../img/homee.png')} alt="Home" />
                  <a href="/admin-index">Home</a>
                </li>
                <li>
                  <img
                    src={require('../img/edit.png')}
                    alt="Developer Info"
                  />
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

export default AdminIndex;
