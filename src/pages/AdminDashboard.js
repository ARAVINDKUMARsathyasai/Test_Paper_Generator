import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Adduser from '../pages/AddSubject';

function AdminDashboard() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const handleClick = () => {
        navigate('/');
        localStorage.clear();
        window.location.reload();
    }

    const [activeCount, setActiveCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [allusersCount, setallTotalCount] = useState(0);
    const [checkedCount, setCheckedCount] = useState(0);
    const [subjectCount, setSubjectCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);

    useEffect(() => {
        fetchQuizCount();
        fetchUserCount();
        fetchCounts();
    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await fetch('http://localhost:8080/Admin/userCount');
            const data = await response.json();

            setallTotalCount(data.totalCount);
            setCheckedCount(data.checkedCount);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };

    const fetchCounts = async () => {
        try {
            const subjectResponse = await fetch('http://localhost:8080/Admin/subjectCount');
            const subjectData = await subjectResponse.json();
            setSubjectCount(subjectData.subjectCount);

            const questionResponse = await fetch('http://localhost:8080/Admin/questionCount');
            const questionData = await questionResponse.json();
            setQuestionCount(questionData.questionCount);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const fetchQuizCount = async () => {
        try {
            const response = await fetch('http://localhost:8080/Admin/testCount');
            const data = await response.json();

            setActiveCount(data.activeCount);
            setTotalCount(data.totalCount);
        } catch (error) {
            console.error('Error fetching quiz count:', error);
        }
    };

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
                            <a href="/adminDashboard" className="active">
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
                                <span>Dashboard</span>
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
                    <div className='cards'>
                        <div class="card-single">
                            <div>
                                <h1>{allusersCount}</h1>
                                <span>Users</span>
                            </div>
                            <div>
                                <span className="fas fa-user"></span>
                            </div>
                        </div>
                        <div class="card-single">
                            <div>
                                <h1>{totalCount}</h1>
                                <span>Tests</span>
                            </div>
                            <div>
                                <span className="fa-solid fa-file-alt"></span>
                            </div>
                        </div>
                        <div class="card-single">
                            <div>
                                <h1>{questionCount}</h1>
                                <span>Questions</span>
                            </div>
                            <div>
                                <span className="fas fa-list"></span>
                            </div>
                        </div>
                        <div class="card-single" onClick={handleShow}>
                            <div>
                                <h1>{subjectCount}</h1>
                                <span>Subjects</span>
                            </div>
                            <div>
                                <span className="fas fa-book"></span>
                            </div>
                        </div>
                        <div class="card-single">
                            <div>
                                <h1>{checkedCount}</h1>
                                <span>Active Users</span>
                            </div>
                            <div>
                                <span className="fa-solid fa-user-graduate"></span>
                            </div>
                        </div>
                        <div class="card-single">
                            <div>
                                <h1>{activeCount}</h1>
                                <span>Active Tests</span>
                            </div>
                            <div>
                                <span className="fas fa-play-circle"></span>
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
            <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add New Subject
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Adduser />
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ fontFamily: "Imprint Mt Shadow",borderRadius:'10px' }} variant="secondary" onClick={handleClose} className='btn btn-danger'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}

export default AdminDashboard;
