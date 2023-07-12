import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/adminIndex.css';
import '../styles/SliderButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

function AdminIndex() {
  const navigate = useNavigate();
  
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    disc: "",
    maxMarks: "",
    numberOFQuestions: "",
    subject: {
      subId: ""
    }
  });

  useEffect(() => {
    fetchSubjects();
    featchQuestion();
  }, []);


  const featchQuestion = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/question/`)
      setQuestions(result.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/subject/');
      setSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const deleteUser = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'You want to delete the question!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8080/question/${id}`)
          .then(() => {
            featchQuestion();
            swal('Deleted the question!', {
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error disabling user:', error);
            swal('Oops!', 'Something went wrong.', 'error');
          });
      } else {
        swal('Question data is safe !!');
      }
    });
  };  

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
              <a href="/adminQuestion" className="active">
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
                <span>All Questions</span>
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
          <div className='bootstrap-wrapper'>
            {questions.length === 0 ? (
              <div className='empty-message text-center' style={{ marginTop: '15%' }}>
                <h3>No questions found</h3>
                <p>There are no questions available for {formData.title} test</p>
              </div>
            ) : (
              questions.map((question, index) => (
                <div
                  className='card'
                  style={{
                    padding: 10,
                    borderRadius: '20px',
                    borderColor: 'purple',
                    margin: '20px',
                  }}
                  key={question.quesId}
                >
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='card-content'>
                        <h3>
                          <b>QNo:- {index + 1}</b> <span>{question.question}</span>
                        </h3>
                        <hr/>
                        <div className='container-fluid'>
                          <div className='row'>
                            <div className='col-md-6'>
                              <h4
                                style={{
                                  background:
                                    question.option1 === question.answer
                                      ? '#ACE1AF'
                                      : 'azure',
                                  color:
                                    question.option1 === question.answer
                                      ? 'black'
                                      : 'black',
                                  padding: 10,
                                  borderRadius: '40px',
                                  textAlign: 'center',
                                  border:
                                    question.option1 === question.answer
                                      ? '2px solid gold'
                                      : '2px solid purple',
                                }}
                              >
                                {question.option1}
                              </h4>
                            </div>
                            <div className='col-md-6'>
                              <h4
                                style={{
                                  background:
                                    question.option2 === question.answer
                                      ? '#ACE1AF'
                                      : 'azure',
                                  color:
                                    question.option2 === question.answer
                                      ? 'black'
                                      : 'black',
                                  padding: 10,
                                  borderRadius: '40px',
                                  textAlign: 'center',
                                  border:
                                    question.option2 === question.answer
                                      ? '2px solid gold'
                                      : '2px solid purple',
                                }}
                              >
                                {question.option2}
                              </h4>
                            </div>
                          </div>
                          <div className='row'>
                            {question.option3 && (
                              <div className='col-md-6'>
                                <h4
                                  style={{
                                    background:
                                      question.option3 === question.answer
                                        ? '#ACE1AF'
                                        : 'azure',
                                    color:
                                      question.option3 === question.answer
                                        ? 'black'
                                        : 'black',
                                    padding: 10,
                                    borderRadius: '40px',
                                    textAlign: 'center',
                                    border:
                                      question.option3 === question.answer
                                        ? '2px solid gold'
                                        : '2px solid purple',
                                  }}
                                >
                                  {question.option3}
                                </h4>
                              </div>
                            )}
                            {question.option4 && (
                              <div className='col-md-6'>
                                <h4
                                  style={{
                                    background:
                                      question.option4 === question.answer
                                        ? '#ACE1AF'
                                        : 'azure',
                                    color:
                                      question.option4 === question.answer
                                        ? 'black'
                                        : 'black',
                                    padding: 10,
                                    borderRadius: '40px',
                                    textAlign: 'center',
                                    border:
                                      question.option4 === question.answer
                                        ? '2px solid gold'
                                        : '2px solid purple',
                                  }}
                                >
                                  {question.option4}
                                </h4>
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className='row'>
                          <div className='col-md-6'>
                              <h4>
                              Correct Answer: <span>{question.answer}</span>
                            </h4>
                          </div>
                          <div className='col-md-6 text-center' >
                          <Link to={`/updateQuestion/${question.quesId}`} className="btn text-warning btn-act" style={{marginLeft:'70%'}} >
                            <i className="fa fa-pencil"></i> 
                          </Link>
                          <button onClick={()=>deleteUser(question.quesId)} className="btn text-danger btn-act" data-toggle="modal">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AdminIndex;
