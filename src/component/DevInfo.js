import React from 'react';
import './devInfo.css';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { addOutline, homeOutline, appsOutline,documentTextOutline,peopleCircleOutline ,arrowUndoOutline ,helpCircleOutline } from 'ionicons/icons';


export default function DevInfo() {
  const toggleMenu = () => {
    const menu = document.querySelector('.me');
    menu.classList.toggle('active');
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  }

  const getEmail = localStorage.getItem('emailData');
  const getName = localStorage.getItem('nameData');

  if (!getEmail || !getName) {
    return (
      <h1>No access</h1>
    )
  }

  return (
    <>
      <div className="bb">
        <div className="me">
          <div className="toggle"  onClick={toggleMenu}>
          <IonIcon icon={addOutline} />
          </div>
          <li style={{ '--i': 0 }}>
            <a href="/admin-index" >
            <IonIcon icon={homeOutline} />
            </a>
          </li>
          <li style={{ '--i': 1 }}>
            <a href="/adminDashboard">
            <IonIcon icon={appsOutline} />
            </a>
          </li>
          <li style={{ '--i': 2 }}>
            <a href="/adminTests">
            <IonIcon icon={documentTextOutline} />
            </a>
          </li>
          <li style={{ '--i': 3 }}>
            <a href="/allUsers">
            <IonIcon icon={peopleCircleOutline} />
            </a>
          </li>
          <li style={{ '--i': 4 }}>
            <a href="/adminQuestion">
            <IonIcon icon={helpCircleOutline} />
            </a>
          </li>
          <li style={{ '--i': 5 }}>
            <a onClick={handleClick} style={{color:'white'}}>
            <IonIcon icon={arrowUndoOutline} />
            </a>
          </li>
        </div>

        <div className="c">
          <div className="imgBx">
            <img src={require('../img/logo.png')} alt="Logo" />
          </div>

          <div className="co">
            <div className="details">
              <h2>
                PROJECT IT HUB<br />
                <span>FinTech Full Stack</span>
                <br />
                <span>Test Paper Genrator</span>
              </h2>
              <div className="data">
                <h3>
                  3<br />
                  <span>Projects</span>
                </h3>
                <h3>
                  150<br />
                  <span>Users</span>
                </h3>
                <h3>
                  50<br />
                  <span>Followers</span>
                </h3>
              </div>
              <div className="actionBtn">
                <button onClick={() => window.open('https://github.com/ARAVINDKUMARsathyasai')}>Follow</button>
                <button onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=manipalpatientrecord@gmail.com')}>Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}