import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function UserAllReports() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const {id} = useParams();

    const[results,setResults] = useState([]);
    const [test, setTests] = useState([]);
  
    const [user, setUser] = useState({
      username: '',
      email: '',
      phoneNo: '',
    });
  
    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/test/${id}`);
        const activeTests = response.data;
        setTests(activeTests);
      } catch (error) {
        console.log(error);
      }
    };
  
    console.log(test)

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
      loadUser();
      featchReport();
      fetchTests();
    }, []);
  
    const featchReport = async()=>{
      try {
          const rpt = await axios.get(`http://localhost:8080/test-results/user/${userId}/test/${id}`);
          setResults(rpt.data);
      }catch(error){
          console.log(error)
      }
    }

    const handleClick = () => {
      navigate('/');
      localStorage.clear();
      window.location.reload();
    };
  
    function menuToggle() {
      const toggleMenu = document.querySelector('.menu');
      const toggleDiv = document.querySelector('.info');
      const togglePic = document.querySelector('.ppp');
      toggleMenu.classList.toggle('active');
      toggleDiv.classList.toggle('active');
      togglePic.classList.toggle('active');
    }
  
    if (!userId) {
      return (
        <div className='container text-center'>
          <img
            src={require('../img/padlock.jpg')}
            style={{ height: '250px', marginTop: '2%', borderRadius: '50%', background: 'purple', padding: 2 }}
          />
          <br />
          <br />
          <h1>Access Denied</h1>
          <h5 style={{ color: '#888888' }}>If you want to access this page login</h5>
          <div className='container ' style={{ display: 'inline' }}>
            <Link to={'/'} className='btn btn-warning' style={{ marginRight: '40px', marginTop: '20px' }}>
              Home
            </Link>
            <Link to={'/userLogin'} className='btn btn-primary' style={{ marginTop: '20px' }}>
              Login
            </Link>
          </div>
        </div>
      );
    }
  
  return (
    <>
      <input type='checkbox' id='nav-toggle' />
      <div className='sidebar'>
        <div className='sidebar-brand'>
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
        <div className='sidebar-menu'>
          <ul>
            <li>
              <a href='/activeTests'>
                <span className='fa-solid fa-file-alt'></span>
                <span>Active Test</span>
              </a>
            </li>
            <li>
              <a href='/userReport' className='active'>
                <span className='fa-solid fa-question-circle'></span>
                <span>Test Reports</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='main-content'>
        <header>
          <h2>
            <label htmlFor='nav-toggle'>
              <span className='las la-bars'>
                <span>Test Reports</span>
              </span>
            </label>
          </h2>
          <div className='user-wrapper'>
            <img  
                onClick={menuToggle}
                src="/capstone.png"
                alt="Capstone Logo"
                width="45px"
                height="45px"
                className="ppp" />
                <div onClick={menuToggle} className='info'>
                   <h6>{user.username.substring(0, user.username.indexOf(' '))}</h6>
                <small>User</small>
                </div>
          </div>
        </header>

        <main>
        <div className="car-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {results.length === 0 ? (
              <div className='empty-message text-center' style={{ marginTop: '10%', marginLeft: '43%' }}>
                <img src={require('../img/noData.png')} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', borderColor: 'red', borderWidth: '6px' }} />
                <h3>No Reports found !</h3>
                <p>There are no {test.title} test report available.</p>
              </div>
            ) : (
              results.map((result) => (
                <div className="cad" onClick={() => navigate(`/testReport/${result.id}`)}  key={result.id} style={{ padding: '10px', position: 'relative', width: 'calc(33.33% - 20px)', margin: '10px' }}>
                     <div  style={{ position: 'absolute', top: '10px', right: '30px' }}  >  
                            <h4>Score: <span style={{color:'darkgreen'}}><b>{(parseInt(test.maxMarks)/parseInt(result.selectedOptions.length))*parseInt(result.correctAnswers)}</b></span> </h4>
                     </div>
                  <div style={{ display: 'initial' }}>
                    <div className="card-image" style={{ marginRight: '10px', display: 'inline-block' }}>
                      <img src={require('../img/rrr.png')} style={{ width: '50px', height: '50px', objectFit: 'cover', marginBottom: '50%', borderRadius: '50%', background: 'gold', padding: 2 }} />
                    </div>
                    <div className="card-content" style={{ display: 'inline-block' }}>
                      <div>
                        <h5 style={{ marginBottom: '5px' }}>{test.title}</h5>
                      </div>
                      <p style={{ color: 'gray' }}>ID:- RP0{result.id}</p>
                    </div>
                    <div className='text-center'>
                      <button className='btn' style={{  background: 'white', marginRight: '2%',color:'darkgreen',fontSize:'20px' }}>Correct: {result.correctAnswers}</button>
                      <button className="btn " style={{ background: 'white', marginRight: '2%',color:'red',fontSize:'20px' }}>wrong: {result.wrongAnswers}</button>
                      <button className="btn " style={{ background: 'white', marginRight: '2%',fontSize:'20px' }}>UnAtempt: {result.unansweredQuestions}</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='cont'>
            <div className='menu'>
              <h3>
                USER <br />
                <span>{user.username}</span>
              </h3>
              <ul>
                <li>
                  <img src={require('../img/homee.png')} />
                  <a href='/userIndex'>Home</a>
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
  )
}
