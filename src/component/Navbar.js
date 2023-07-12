import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faHome, faHospitalUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ fontFamily: "times new roman", background: 'linear-gradient(to right, purple, #800080)' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/capstone.png" alt="Test Paper Generator" style={{ width: "25px", height: "25px", borderRadius: "50%", border: "2px solid gold", marginRight: "5px" }} />
            Test Paper Generator
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <FontAwesomeIcon icon={faHome} /> HOME
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="adminLogin">
                  <FontAwesomeIcon icon={faHospitalUser} /> ADMIN
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="userLogin">
                  <FontAwesomeIcon icon={faRightToBracket} /> LOGIN
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="gold-line"></div>
      </nav>
      <style>
        {`
          .navbar {
            position: relative;
          }

          .gold-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: gold;
          }
        `}
      </style>
    </>
  );
}