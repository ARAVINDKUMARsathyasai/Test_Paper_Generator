import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaSpinner, FaWifi } from 'react-icons/fa';
import WebCam from "react-webcam";

export default function TestInstrct() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNo: '',
  });

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

  const [cameraAccess, setCameraAccess] = useState(false);
  const [microphoneAccess, setMicrophoneAccess] = useState(false);
  const [internetAccess, setInternetAccess] = useState(true);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [loadingMicrophone, setLoadingMicrophone] = useState(false);

  useEffect(() => {
    if (cameraAccess) {
      setLoadingCamera(true);
      setTimeout(() => {
        setLoadingCamera(false);
      }, 1500);
    }
  }, [cameraAccess]);

  useEffect(() => {
    if (microphoneAccess) {
      setLoadingMicrophone(true);
      setTimeout(() => {
        setLoadingMicrophone(false);
      }, 1500);
    }
  }, [microphoneAccess]);

  useEffect(() => {
    fetchSubjects();
    loadTest();
    loadUser();
    checkMediaPermissions();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/subject/');
      setSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();

  const loadTest = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/test/${id}`);
      setFormData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/Admin/user/${userId}`);
      setUser(result.data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const checkMediaPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const tracks = mediaStream.getTracks();
      const cameraTrack = tracks.find(track => track.kind === 'video');
      const microphoneTrack = tracks.find(track => track.kind === 'audio');

      if (cameraTrack && cameraTrack.readyState === 'live') {
        setCameraAccess(true);
      } else {
        setCameraAccess(false);
      }

      if (microphoneTrack && microphoneTrack.readyState === 'live') {
        setMicrophoneAccess(true);
      } else {
        setMicrophoneAccess(false);
      }

      mediaStream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.log(error);
      setCameraAccess(false);
      setMicrophoneAccess(false);
    }
  };

  useEffect(() => {
    const closeOtherTabs = () => {
      const currentTabUrl = window.location.href;
      const windows = window.open('', '_blank');
  
      if (windows && windows.location.href !== currentTabUrl) {
        const confirmation = window.confirm('Please close all other tabs except the current tab to proceed.');
        if (confirmation) {
          windows.close();
        } else {
          window.location.href = currentTabUrl;
        }
      }
    };
  
    window.addEventListener('load', closeOtherTabs);
  
    return () => window.removeEventListener('load', closeOtherTabs);
  }, []);

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
              <a href="/activeTests" className='active'>
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
                <span>{formData.title} Test Instructions</span>
              </span>
            </label>
          </h2>
          <div className="user-wrapper">
            <img
              src="/capstone.png"
              alt="Capstone Logo"
              width="45px"
              height="45px"
              className="ppp"
            />
            <div className="info">
              <h6>{user.username.substring(0, user.username.indexOf(' '))}</h6>
              <small>User</small>
            </div>
          </div>
        </header>

        <main>
          <div className="status-container">
            <h1 style={{textAlign:'center'}}><b>Read the instructions of this page carefully</b></h1>
            <span style={{textAlign:'center',color:'gray'}}>-: One step more to go :-</span>
            <hr/>
            <h3 style={{fontWeight:'bold'}}>{formData.title}</h3>
            <h4>{formData.disc}</h4>
            <hr/> 
            <h3>Access Status :- </h3>
            <div className="status-item" style={{marginLeft:'20%', marginTop:'-3%'}}>
              {cameraAccess ? (
                <>
                  <FaVideo className="status-icon success" />
                  <span className="status-text success">Camera Access Granted</span>
                </>
              ) : (
                <>
                  <FaVideoSlash className="status-icon failure" />
                  <span className="status-text failure">Camera Access Denied</span>
                </>
              )}
              {loadingCamera && <FaSpinner className="status-icon" />}
            </div>
            <div className="status-item" style={{marginLeft:'53%', marginTop:'-3%'}}>
              {microphoneAccess ? (
                <>
                  <FaMicrophone className="status-icon success" />
                  <span className="status-text success">Microphone Access Granted</span>
                </>
              ) : (
                <>
                  <FaMicrophoneSlash className="status-icon failure" />
                  <span className="status-text failure">Microphone Access Denied</span>
                </>
              )}
              {loadingMicrophone && <FaSpinner className="status-icon" />}
            </div>
            {!navigator.onLine && (
              <div className="status-item">
                <FaWifi className="status-icon" />
                <span className="status-text">Internet access not available.</span>
              </div>
            )}
            <hr/>
            <h3 style={{fontWeight:'bold',textDecoration:'underline',textAlign:'center'}}>-: Important Instructions :-</h3>
            <ul className="test-instructions">
              <li><span className="bullet">•</span> This test is enhance the internal stratagies of you.</li>
              <li><span className="bullet">•</span> You have to submit the test with in  <b>{formData.numberOFQuestions*2} minutes </b></li>
              <li><span className="bullet">•</span> You can attempt the test any number of times.</li>
              <li><span className="bullet">•</span> There are <b>{formData.numberOFQuestions}</b> questions in this test.</li>
              <li><span className="bullet">•</span> Each question carries  <b>{formData.maxMarks/formData.numberOFQuestions} marks</b> . No negative marking for wrong ones </li>
              <li><span className="bullet">•</span> All Questions is of MCQ types. </li>
            </ul>
            <hr/>
            <h3 style={{fontWeight:'bold',textDecoration:'underline',textAlign:'center'}}>-: Attempting Test :-</h3>
            <ul className="test-instructions">
            <li>
              <span className="bullet">•</span> Click <b>Start Test</b> button to start the test.
            </li>
            <li>
              <span className="bullet">•</span> The time will start the moment you click the start test button.
            </li>
            <li>
              <span className="bullet">•</span> You can resume this quiz if interrupted due to any reason.
            </li>
            <li>
              <span className="bullet">•</span> Scroll down to move to the next question.
            </li>
            <li>
              <span className="bullet">•</span> Click on the submit test button upon completion of the test.
            </li>
            <li>
              <span className="bullet">•</span> A report of the test is automatically generated.
            </li>
            <br></br>
            <h4><b>*Note</b></h4>
            <li>
              <span className="bullet">•</span> You can see the Start Test button only if camera and microphone access is granted.
            </li>
          </ul>
            <hr/>
            <br/>
            <div className='text-center'>
              {cameraAccess && microphoneAccess ? (
                <Link to={`/testStart/${formData.qId}`} className='btnn' style={{ background: 'orange' ,padding:10,width:'70%'}}>
                  Start Test
                </Link>
              ) : null}
            </div>
          </div>
          {cameraAccess && (
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
          )}
        </main>
      </div>
    </>
  );
}
