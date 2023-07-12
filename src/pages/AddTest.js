import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/adminIndex.css';
import '../styles/SliderButton.css';

export default function AddTest() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    disc: "",
    maxMarks: "",
    numberOFQuestions: "", 
    subject: {
      subId: ""
    }
  });

  const [validationErrors, setValidationErrors] = useState({
    maxMarksError: "",
    numberOFQuestionsError: ""
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

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
    return (
      <div className='container text-center'>
        <img src={require('../img/padlock.jpg')} style={{ height: "250px", marginTop: '2%', borderRadius: '50%', background: 'purple', padding: 2 }}></img>
        <br></br>
        <br></br>
        <h1>Access Denied</h1>
        <h5 style={{ color: "#888888" }}>If you want to access this page login </h5>
        <div className='container ' style={{ display: 'inline' }}>
          <Link to={'/'} className='btn btn-warning' style={{ marginRight: "40px", marginTop: "20px" }}>Home</Link>
          <Link to={'/adminLogin'} className="btn btn-primary" style={{ marginTop: "20px" }}>Login</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/test/', {
        title: formData.title,
        disc: formData.disc,
        maxMarks: formData.maxMarks,
        numberOFQuestions: formData.numberOFQuestions, 
        subject: {
          subId: formData.subject.subId
        },
      });
      console.log(response.data);
      setFormData({
        title: "",
        disc: "",
        maxMarks: "",
        numberOFQuestions: "",
        subject: {
          subId: ""
        }
      });
      navigate('/adminTests');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'subject') {
      setFormData({
        ...formData,
        subject: {
          subId: value
        }
      });
    } else if (name === 'numberOFQuestions') { 
      setFormData({
        ...formData,
        numberOFQuestions: value
      });

      if (value < 0) {
        setValidationErrors({
          ...validationErrors,
          numberOFQuestionsError: "Number of questions cannot be negative"
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          numberOFQuestionsError: ""
        });
      }
    } else if (name === 'maxMarks') {
      setFormData({
        ...formData,
        maxMarks: value
      });

      if (value < 0) {
        setValidationErrors({
          ...validationErrors,
          maxMarksError: "Maximum marks cannot be negative"
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          maxMarksError: ""
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const { maxMarksError, numberOFQuestionsError } = validationErrors;
  const isSubmitDisabled = maxMarksError !== "" || numberOFQuestionsError !== "";

  return (
    <>
      <input type="checkbox" id="nav-toggle" />
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h2>
            <label htmlFor="nav-toggle">
              <span className="las la-bars">
                <span>Create New Test</span>
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
          {/* Add New Test Form */}
          <div className='card' style={{ borderRadius: "20px" }}>
            <h3 className='text-center'>Add New Test</h3>
            <div className='container'>
              <div className='row'>
                <div className='col-md-8 offset-md-2'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor='title' className='form-label'>Title</label>
                      <input
                        type="text"
                        className='form-control'
                        placeholder='Enter the subject name'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='disc' className='form-label'>Description</label>
                      <textarea
                        className='form-control'
                        placeholder='Enter the description'
                        name='disc'
                        value={formData.disc}
                        onChange={handleInputChange}
                        rows={3}
                        required
                      />
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='maxMarks' className='form-label'>Maximum Marks</label>
                          <input
                            type="number"
                            className='form-control'
                            placeholder='Enter the Maximum Marks'
                            name='maxMarks'
                            value={formData.maxMarks}
                            onChange={handleInputChange}
                            required
                          />
                          {maxMarksError && <div className="text-danger">{maxMarksError}</div>}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='numberOFQuestions' className='form-label'>Number Of Questions</label> 
                          <input
                            type="number"
                            className='form-control'
                            placeholder='Enter the Number Of Questions'
                            name='numberOFQuestions' 
                            value={formData.numberOFQuestions} 
                            onChange={handleInputChange}
                            required
                          />
                          {numberOFQuestionsError && <div className="text-danger">{numberOFQuestionsError}</div>}
                        </div>
                      </div>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='subject' className='form-label'>Subject</label>
                      <select
                        className='form-control'
                        name='subject'
                        value={formData.subject.subId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value=''>Select a subject</option>
                        {subjects.map(subject => (
                          <option key={subject.subId} value={subject.subId}>
                            {subject.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button type="submit" style={{ fontFamily: "Imprint Mt Shadow", borderRadius: '10px' }} className='btnn btn-primary mb-3 text-center' disabled={isSubmitDisabled}>
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Side Menu */}
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
