import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdateQuestion() {
    const navigate = useNavigate();
    const { id } = useParams();
  
    const [formData, setFormData] = useState({
      title: "",
      disc: "",
      maxMarks: "",
      numberOFQuestions: "",
      active: "",
      subject: {
        subId: ""
      }
    });
  
    useEffect(() => {
        loadQuestion();
    }, []);
  
    const loadQuestion= async()=>{
        const res = await axios.get(`http://localhost:8080/question/${id}`);
        setQuestion(res.data);
    }
  
    const [question, setQuestion] = useState({
      quesId:id,
      question: "",
      image: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      test: {
        qId: ""
      }
    });
  
    const handleClick = () => {
      navigate('/');
      localStorage.clear();
      window.location.reload();
    };
  
    const getEmail = localStorage.getItem('emailData');
    const getName = localStorage.getItem('nameData');
  
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
        const response = await axios.put('http://localhost:8080/question/', {
            quesId:id,
          question: question.question,
          image: question.image,
          option1: question.option1,
          option2: question.option2,
          option3: question.option3,
          option4: question.option4,
          answer: question.answer,
          test: {
            qId: question.test.qId
          }
        });
        console.log(response.data);
        setQuestion({
          question: "",
          image: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
          test: {
            qId: ""
          }
        });
        navigate(`/adminQuestion`);
      } catch (error) {
        console.log(error);
      }
    };

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
                  style={{ borderRadius: '50%', border: '2px solid gold' }} />
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
                <a href="/adminQuestion"  className="active">
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
                  <span>Update  Question </span>
                </span>
              </label>
            </h2>
            <div className="user-wrapper">
              <img
                src="/capstone.png"
                alt="Capstone Logo"
                width="45px"
                height="45px"
              />
              <div>
                <h6>{getName.substring(0, getName.indexOf(' '))}</h6>
                <small>Admin</small>
              </div>
            </div>
          </header>
  
          <main style={{ marginTop: '4%' }}>
            <div className='bootstrap-wrapper'>
              <div className='row'>
                <div className='col-md-12'>
                  <h4 className='text-center'> <b>Updating Question details</b> </h4>
                  <div className='card'>
                    <div className='card-header'>
                      <div className='card-subtitle text-center'>
                        <h4>-: Update question details :-</h4>
                      </div>
                    </div>
                    <div className='card-content'>
                      <div className='row' style={{ fontSize: '20px' }}>
                        <div className='col-md-12'>
                          <form onSubmit={handleSubmit}>
                            <div className='container'>
                              <div className='card'>
                                <div className='row'>
                                  <div className='col-md-12'>
                                    <div className='form-group'>
                                      <label htmlFor='question' style={{ fontSize: '20px' }}>Question:</label>
                                      <textarea
                                        className='form-control'
                                        id='question'
                                        name='question'
                                        value={question.question}
                                        placeholder='Type your question here'
                                        rows={6}
                                        onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label htmlFor='option1'>Option 1:</label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          id='option1'
                                          name='option1'
                                          value={question.option1}
                                          placeholder='Type Option 1'
                                          onChange={(e) => setQuestion({ ...question, option1: e.target.value })}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label htmlFor='option2'>Option 2:</label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          id='option2'
                                          name='option2'
                                          placeholder='Type Option 2'
                                          value={question.option2}
                                          onChange={(e) => setQuestion({ ...question, option2: e.target.value })}
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label htmlFor='option3'>Option 3:</label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          id='option3'
                                          name='option3'
                                          placeholder='Type Option 3 if true or flase type ignore '
                                          value={question.option3}
                                          onChange={(e) => setQuestion({ ...question, option3: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label htmlFor='option4'>Option 4:</label>
                                        <input
                                          type='text'
                                          className='form-control'
                                          id='option4'
                                          name='option4'
                                          value={question.option4}
                                          placeholder='Type Option 4 if true or flase type ignore '
                                          onChange={(e) => setQuestion({ ...question, option4: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                    <div className='form-group' style={{ marginBottom: '2%' }}>
                                      <label htmlFor='answer'>Correct Answer:</label>
                                      <select
                                        className='form-control'
                                        id='answer'
                                        name='answer'
                                        value={question.answer}
                                        onChange={(e) => setQuestion({ ...question, answer: e.target.value })}
                                        required
                                      >
                                        <option value='' disabled>Select correct answer</option>
                                        <option value={question.option1}>{question.option1}</option>
                                        <option value={question.option2}>{question.option2}</option>
                                        <option value={question.option3}>{question.option3}</option>
                                        <option value={question.option4}>{question.option4}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='text-center' style={{ marginTop: '2%' }}>
                              <button type='submit' className='btnn btn-primary' style={{ width: '450px' }}>Update Question</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
  )
}
