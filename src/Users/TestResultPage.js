import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, Card } from 'react-bootstrap';
import tickImage from '../img/tickImage.png';
import wrongImg from '../img/wrongImg.png';
import unAtempt from '../img/noData.png';

export default function TestResultPage() {
  const { id } = useParams();
  const [testResult, setTestResult] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    disc: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: '',
    subject: {
      subId: '',
    },
  });

  const loadTest = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/test/${testResult.testId}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to load test:', error);
    }
  };

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/test-results/${id}`);
        setTestResult(response.data);
      } catch (error) {
        console.error('Failed to fetch test result:', error);
      }
    };
    fetchTestResult();
  }, [id]);

  useEffect(() => {
    if (testResult && testResult.testId) {
      loadTest();
    }
  }, [testResult]);

  useEffect(() => {
    const exitFullscreen = () => {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    };

    exitFullscreen(); 

    return () => {
      exitFullscreen();
    };
  }, []);

  if (!testResult) {
    return <div>Loading...</div>;
  }

  const calculateScore = () => {
    const correctAnswers = parseInt(testResult.correctAnswers);
    const maxMarks = parseInt(formData.maxMarks);
    const numberOfQuestions =  parseInt(testResult.selectedOptions.length)
  
    if (
      isNaN(correctAnswers) ||
      isNaN(maxMarks) ||
      isNaN(numberOfQuestions) ||
      maxMarks === 0
    ) {
      return 0; 
    }
  
    return (maxMarks/numberOfQuestions ) * correctAnswers;
  };
  
  const score = calculateScore();  

  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-dark " style={{background:'purple'}}>
        <div className="container-fluid">
        <a className="navbar-brand" href='/activeTests' style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
          {formData.title} Test
        </a>
        </div>
      </nav>
    <div className='container' style={{width:'100%',maxWidth:'100%',maxHeight:'100vh'}}>
        <div className='text-center' style={{marginLeft:'40%',marginTop:'1%',marginBottom:'1%'}}>
            <div className='card' style={{width:'420px',height:'220px',boxShadow: '2px 2px 25px grey',borderColor:'gold',borderWidth:'3px'}}>
                <h3 style={{marginTop:'3%'}}><b>Your Score is:</b></h3>
                <div style={{background:'grey',color:'white',borderRadius:'50%',width:'100px',height:'100px', marginLeft:'40%',marginTop:'4%'}}>
                    <h1 className='text-center' style={{fontSize:'58px',marginTop:'12%'}}><b>{score}</b></h1>
                </div>
            </div>
      </div>
      <div className='text-center' style={{marginLeft:'40%',marginTop:'2%',marginBottom:'2%'}}>
        <div className='card' style={{width:'420px',height:'100px',boxShadow: '2px 2px 25px grey'}}>
            <div className='row' style={{marginTop:'10px'}}>
                <div className='col-md-6'>
                    <h4><b>Max Marks        :</b></h4>
                </div>
                <div className='col-md-6'>
                    <h4><b>{formData.maxMarks}</b></h4>
                </div>
            </div>
            <div className='row' style={{marginTop:'10px'}}>
                <div className='col-md-6'>
                    <h4><b> Total Questions :</b></h4>
                </div>
                <div className='col-md-6'>
                    <h4><b>{testResult.selectedOptions.length}</b></h4>
                </div>
            </div>
        </div>
      </div>
      <div className='container text-center' style={{marginLeft:'18%'}}>
        <div className='row'>
            <div className='col-md-3'>
                <div className='card' style={{boxShadow: '2px 2px 25px grey'}}>
                    <img src={tickImage} alt='Tick'  style={{width:'45px',height:'50px',borderRadius:'50%',marginLeft:'45%'}} />
                    <h3><b>Correct</b></h3>
                    <h3 style={{color:'darkgreen'}}><b>{testResult.correctAnswers}</b></h3>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card' style={{boxShadow: '2px 2px 25px grey'}} >
                   <img src={ wrongImg} alt='Tick'  style={{width:'45px',height:'50px',borderRadius:'50%',marginLeft:'45%'}} />
                    <h3><b>Wrong</b></h3>
                    <h3 style={{color:'red'}}><b>{testResult.wrongAnswers}</b></h3>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card' style={{boxShadow: '2px 2px 25px grey'}}>
                    <img src={ unAtempt} alt='Tick'  style={{width:'45px',height:'50px',borderRadius:'50%',marginLeft:'45%'}} />
                    <h3><b>Un-Attempted</b></h3>
                    <h3><b>{testResult.unansweredQuestions}</b></h3>
                </div>
            </div>
        </div>
      </div>
    </div><div style={{ width: '100%', height: '49px', background: 'purple', marginTop: '4%', display: 'flex', alignItems: 'center' }}>
  <div className='row text-center' style={{ flex: '1' }}>
    <div className='col-md-6 text-center' style={{ borderRight: '1px solid white', height: '100%' }}>
      <Link to={`/testInstruct/${testResult.testId}`} style={{ lineHeight: '49px', color:'white' }}><b>RE_ATTEMPT</b></Link>
    </div>
    <div className='col-md-6 text-center' style={{ height: '100%' }}>
      <Link to={`/testReport/${id}`} style={{ lineHeight: '49px', color:'white' }}><b>VIEW REPORT</b></Link>
    </div>
  </div>
</div>
    </>
  );
}