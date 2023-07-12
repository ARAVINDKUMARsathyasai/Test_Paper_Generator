import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import WebCam from "react-webcam";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function TestLandingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');

  const userId = localStorage.getItem('userId');

  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNo: '',
  });

  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    disc: '',
    maxMarks: '',
    numberOFQuestions: '',
    active: '',
    subject: {
      subId: '',
    },
  });

  const [question, setQuestions] = useState([]);

  useEffect(() => {
    loadTest();
    loadUser();
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      const qtns = await axios.get(`http://localhost:8080/question/test/${id}/${userId}`);
      setQuestions(qtns.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadTest = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/test/${id}`);
      setFormData(res.data);
      setCountdown(res.data.numberOFQuestions * 2 * 60); 
    } catch (error) {
      console.log(error);
    }
  };
  
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setCountdown(formData.numberOFQuestions * 2 * 60);
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          evaluateTest(); 
          return 0;
        }
      });
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/Admin/user/${userId}`);
      setUser(result.data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();

      Swal.fire({
        icon: 'warning',
        title: 'Right-click Disabled',
        text: 'Right-click is disabled on this page.',
      });
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();

      event.returnValue = 'Leaving this page will end your test. Are you sure you want to leave?';
    };

    const handleNewWindow = (event) => {
      event.preventDefault();
      window.close();
    };

    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Exiting Fullscreen',
          text: 'You are exiting fullscreen mode. This will end your test.',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/activeTests');
          } else {
            enterFullscreen();
          }
        });
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('click', handleNewWindow);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    const elem = document.documentElement;

    const enterFullscreen = () => {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
          .catch((error) => {
            console.error('Fullscreen request failed:', error);
          });
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else {
        console.error('Fullscreen mode is not supported in this browser.');
      }
    };

    enterFullscreen();

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('click', handleNewWindow);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [navigate]);

  const handleOptionChange = (e, questionIndex) => {
    const updatedQuestions = [...question];
    updatedQuestions[questionIndex].selectedOption = e.target.value;
    setQuestions(updatedQuestions);
  };

  const evaluateTest = async () => {
    if (countdown > 0) {
      let correctCount = 0;
      let wrongCount = 0;
      let unansweredCount = 0;
  
      for (const q of question) {
        if (q.selectedOption === q.answer) {
          correctCount++;
        } else if (q.selectedOption) {
          wrongCount++;
        } else {
          unansweredCount++;
        }
      }
  
      console.log('Total Correct Answers:', correctCount);
      console.log('Total Wrong Answers:', wrongCount);
      console.log('Total Unanswered Questions:', unansweredCount);
  
      const timeTaken = (formData.numberOFQuestions * 2 * 60) - countdown;
      console.log('Time Taken:', timeTaken);
  
      const testResult = {
        testId: id,
        userId : userId,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        unansweredQuestions: unansweredCount,
        selectedOptions: question.map(q => ({ questionId: q.quesId, selectedOption: q.selectedOption }))
      };
  
      try {
        const response = await axios.post('http://localhost:8080/test-results', testResult);
        console.log('Test result submitted:', response.data);
        navigate(`/testResult/${response.data.id}`);
      } catch (error) {
        console.error('Failed to submit test result:', error);
      }
    } else {
      console.log('Time is up. Cannot submit the test.');
    }
  };
  
  if (!userId) {
    return (
      <div className='container text-center'>
        <img
          src={require('../img/padlock.jpg').default}
          style={{ height: '250px', marginTop: '2%', borderRadius: '50%', background: 'purple', padding: 2 }}
          alt="Padlock"
        />
        <br></br>
        <br></br>
        <h1>Access Denied</h1>
        <h5 style={{ color: "#888888" }}>If you want to access this page login </h5>
        <div className='container ' style={{ display: 'inline' }}>
          <Link to={'/'} className='btn btn-warning' style={{ marginRight: "40px", marginTop: "20px" }}>Home</Link>
          <Link to={'/userLogin'} className="btn btn-primary" style={{ marginTop: "20px" }}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark " style={{background:'purple'}}>
        <div className="container-fluid">
          <a className="navbar-brand" style={{ fontFamily: "times new roman", cursor: 'pointer' }}>{formData.title} Test</a>
        </div>
        <div className= "collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item" style={{ marginLeft: '-220%' }}>
              <Button className="nav-link " aria-current="page" style={{ width: '90px',background:'white',color:'black',borderColor:'gold' }}>
                {formData.numberOFQuestions * 2} min
              </Button>
            </li>
            <li className="nav-item" style={{ marginRight: '10%', marginLeft: '10%' }}>
              <Button className="nav-link" aria-current="page" style={{background:'white',color:'black',borderColor:'gold'}} >
                {formData.numberOFQuestions} Questions
              </Button>
            </li>
            <li className='nav-item' style={{ marginLeft: '160%' }}>
              <button className='btn btn-info' style={{ borderRadius: '50%', fontWeight: 'bold', borderColor: 'gold', borderWidth: '2px' }}>{user.username.charAt(0).toUpperCase()}</button>
            </li>
            <li className="nav-item" style={{ display: 'inline-block' }}>
              <a className="nav-link active" aria-current="page">
                <b>{user.username}</b>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main style={{ minHeight: '80vh', marginTop: '-1%' }}>
        <div className='bootstrap-wrapper'>
          <div className='container-fluid'>
            <div className='col-md-9'>
              <div className='bootstrap-wrapper'>
                {question.length === 0 ? (
                  <div>
                    <img src={require('../img/noData.png')} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', borderColor: 'red', borderWidth: '6px' }} />
                    <h3>No questions found</h3>
                    <p>There are no questions available for {formData.title} test</p>
                  </div>
                ) : (
                  question.map((question, index) => (
                    <div key={question.quesId}>
                      <div
                        className='card'
                        style={{
                          padding: 10,
                          borderRadius: '20px',
                          borderColor: 'purple',
                          margin: '20px',
                        }}
                      >
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='card-dontent'>
                              <h3>
                                <b>QNo:- {index + 1}</b> <span>{question.question}</span>
                              </h3>
                              <hr />
                              <div className='container-fluid'>
                                <div className='row'>
                                  <div className='col-md-6' style={{ marginBottom: '10px',fontSize:'20px' }}>
                                    <input
                                      type='radio'
                                      value={question.option1}
                                      checked={question.selectedOption === question.option1}
                                      onChange={(e) => handleOptionChange(e, index)}
                                      style={{marginRight:'5px'}}
                                    />
                                    {question.option1}
                                  </div>
                                  <div className='col-md-6' style={{ marginBottom: '10px' ,fontSize:'20px'}}>
                                    <input
                                      type='radio'
                                      value={question.option2}
                                      checked={question.selectedOption === question.option2}
                                      onChange={(e) => handleOptionChange(e, index)}
                                      style={{marginRight:'5px'}}
                                    />
                                    {question.option2}
                                  </div>
                                </div>
                                <div className='row'>
                                  {question.option3 && (
                                    <div className='col-md-6' style={{ marginBottom: '10px' ,fontSize:'20px'}}>
                                      <input
                                        type='radio'
                                        value={question.option3}
                                        checked={question.selectedOption === question.option3}
                                        onChange={(e) => handleOptionChange(e, index)}
                                        style={{marginRight:'5px'}}
                                      />
                                      {question.option3}
                                    </div>
                                  )}
                                  {question.option4 && (
                                    <div className='col-md-6' style={{ marginBottom: '10px' ,fontSize:'20px'}}>
                                      <input
                                        type='radio'
                                        value={question.option4}
                                        checked={question.selectedOption === question.option4}
                                        onChange={(e) => handleOptionChange(e, index)}
                                        style={{marginRight:'5px'}}
                                      />
                                      {question.option4}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <button className='btnn' style={{ width: '400px', marginLeft: '25%' }} onClick={evaluateTest}>
              Submit
            </button>
          </div>
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '420px',
            right: '20px',
            width: '300px',
            height: '180px'
          }}
        >
           <div style={{ padding: '20px' }}>
            <CircularProgressbar
              value={(countdown / (formData.numberOFQuestions * 2 * 60)) * 100}
              text={`${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}
              styles={{
                root: {},
                path: { stroke: countdown < 60 ? 'red' : 'green', },
                text: {
                  fill: countdown < 60 ? 'red' : 'black',
                  fontSize: '18px',
                  fontWeight: 'bold'
                },
              }}        
            />
          </div>
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '300px',
            height: '180px',
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            background: 'gold'
          }}
        >
          <WebCam style={{ borderRadius: '20px', padding: 2 }} />
        </div>
      </main>
    </div>
  );
}
