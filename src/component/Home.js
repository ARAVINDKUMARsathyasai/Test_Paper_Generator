import React, { PureComponent, useEffect } from 'react';
import Navbar from './Navbar';
import '../component/Home.css';
import Footer from './Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class Home extends PureComponent {
  render() {
    return (
      <>
        <Navbar />
        <div
          id="carouselExampleControls"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={require('../img/college.jpg')}
                className="d-block w-100"
                alt="Slide 1"
                height="650px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require('../img/teacher.png')}
                className="d-block w-100"
                alt="Slide 2"
                height="650px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require('../img/digitalExam.png')}
                className="d-block w-100"
                alt="Slide 3"
                height="650px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={require('../img/mcq.png')}
                className="d-block w-100"
                alt="Slide 4"
                height="650px"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <hr />
        <div className='container p-3'>
          <p className='text-center fs-2' style={{ fontFamily: "times new roman", marginTop: "-2%", fontWeight: 800 }}>-: Key Features Of Our Tool :-</p>
          <div className='row'>
            <div className='col-md-8 p-5'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='card point-card'>
                    <div className='card-body'>
                      <p className='fs-5 text-center' style={{ fontWeight: 600, fontFamily: "times new roman" }}>100% safety</p>
                      <p style={{ fontFamily: "times new roman", marginTop: "-2%" }}>It is important to note that while a test paper generator can implement strong security measures, complete safety can also depend on the user's actions </p>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='card point-card'>
                    <div className='card-body'>
                      <p className='fs-5 text-center' style={{ fontWeight: 600, fontFamily: "times new roman" }}>Automatic Result Generation</p>
                      <p style={{ fontFamily: "times new roman", paddingBottom: "15px" }}>This feature simplifies the grading process and allows for efficient analysis of student performance.</p>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 mt-2'>
                  <div className='card point-card'>
                    <div className='card-body'>
                      <p className='fs-5 text-center' style={{ fontWeight: 600, fontFamily: "times new roman" }}>Customizable Test Paper Generation</p>
                      <p style={{ fontFamily: "times new roman", marginTop: "-2%" }}> This feature enables the creation of tailored test papers to meet specific requirements.</p>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 mt-2'>
                  <div className='card point-card'>
                    <div className='card-body'>
                      <p className='fs-5 text-center' style={{ fontWeight: 600, fontFamily: "times new roman" }}>Question Bank Management</p>
                      <p style={{ fontFamily: "times new roman", marginTop: "-2%" }}>This feature allows for easy access to a diverse range of questions for test paper generation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4' style={{ borderRadius: "20%", borderColor: "gold" }}>
              <img alt="" src={require('../img/exam.png')} />
            </div>
          </div>
        </div>

        <hr />
        <div className='container p-3'>
          <p className='text-center fs-2' style={{ fontFamily: "times new roman", marginTop: "-2%", fontWeight: 800 }}>-: Trending Topics :-</p>
          <div className='row'>
            <div className='col-md-3'>
              <div className='card point-card'>
                <div className='card-body text-center'>
                  <img src={require('../img/java.png')} width="250px" height="260px" />
                  <p className='fw-bold fs-5' style={{ fontFamily: "times new roman", fontWeight: 600, fontSize: "18px" }}>Java</p>
                  <p className='fs-7' style={{ paddingBottom: "25px", fontFamily: "courier new", color: 'black' }}>Java is a object-oriented programming language known for its platform independence and widespread use in various applications.</p>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='card point-card'>
                <div className='card-body text-center'>
                  <img src={require('../img/spring_boot.png')} width="250px" height="280px" />
                  <p className='fw-bold fs-5' style={{ fontFamily: "times new roman", fontWeight: 600, fontSize: "18px" }}>Spring Boot</p>
                  <p className='fs-7' style={{ fontFamily: "courier new", color: 'black' }}>Spring Boot is a powerful Java framework that simplifies the development of robust, production-ready applications.</p>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='card point-card'>
                <div className='card-body text-center'>
                  <img src={require('../img/expressjs.png')} width="250px" height="300px" />
                  <p className='fw-bold fs-5' style={{ fontFamily: "times new roman", fontWeight: 600, fontSize: "18px" }}>Express JS</p>
                  <p className='fs-7' style={{ paddingBottom: "25px", fontFamily: "courier new", color: 'black' }}>Express.js is a minimalist web application framework for Node.js.</p>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='card point-card'>
                <div className='card-body text-center'>
                  <img src={require('../img/reactjs.png')} width="250px" height="300px" />
                  <p className='fw-bold fs-5' style={{ fontFamily: "times new roman", fontWeight: 600, fontSize: "18px" }}>React JS</p>
                  <p className='fs-7' style={{ paddingBottom: "25px", fontFamily: "courier new", color: 'black' }}>React.js is a JavaScript library for building user interfaces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
