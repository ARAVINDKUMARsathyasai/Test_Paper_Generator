import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, Button } from 'react-bootstrap';
import Adduser from '../Users/AddUser';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import swal from 'sweetalert';

export default function Home() {

  const [show, setShow] = useState(false);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const deleteUser = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'You want to disable the user',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:8080/Admin/${id}`)
          .then(() => {
            loadUsers();
            swal('User data has been disabled!', {
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error disabling user:', error);
            swal('Oops!', 'Something went wrong.', 'error');
          });
      } else {
        swal('User can access data !!');
      }
    });
  };  
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  }


  useEffect(() => {
    if (users.length > 0) {
      if (!tableRef.current) {
        tableRef.current = $('#example').DataTable({
          dom: 'Bfrtip',
          buttons: [
            'copy',
            {
              extend: 'excel',
              text: 'Export Excel',
              exportOptions: {
                columns: ':visible'
              }
            },
            'csv'
          ],
        });
      }
    }
  }, [users]);
  
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
              <a href="/adminDashboard">
                <span className="fas fa-desktop"></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/allUsers" className='active'>
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
                <span>All Users</span>
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
          <div className="recent-grid">
            <div className="card">
              <div className="card-header">
                <h3 className='text-center' style={{fontWeight:800,fontSize:'28px'}}>-: All Users :-</h3>
                <button className="btn btn-primary" style={{ marginLeft: '90%', display: 'inline' }} onClick={handleShow}>
                  <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>&#xE147;</i>
                  <span style={{ verticalAlign: 'middle' }}>Add User</span>
                </button>

              </div>
              <div className="card-body">
                <table id="example" className="stripe hover">
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>User Name</th>
                      <th className='text-center'>Email</th>
                      <th>Phone Number</th>
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td><Link to={`/userReports/${user.id}`} style={{color:'blue'}}>ST0{user.id}</Link></td>
                        <td>{user.username}</td>
                        <td className='text-center'>{user.email}</td>
                        <td>{user.phoneNo}</td>
                        <td className='text-center'>
                          {user.checked ? (
                            <button className="btn btn-success">
                              <FontAwesomeIcon icon={faCheck} />
                              Active
                            </button>
                          ) : (
                            <button className="btn btn-warning" disabled>
                              <FontAwesomeIcon icon={faTimes} />
                              Disabled
                            </button>
                          )}
                        </td>
                        <td className="text-center" style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                          <Link className="btn text-warning btn-act" data-toggle="modal"
                           to={`/edituser/${user.id}`}
                          >
                            <i className="fa fa-pencil"></i> 
                          </Link>
                          <button onClick={()=>deleteUser(user.id)} className="btn text-danger btn-act" data-toggle="modal" disabled={!user.checked}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                    <th>User Id</th>
                      <th>User Name</th>
                      <th className='text-center'>Email</th>
                      <th>Phone Number</th>
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </tfoot>
                </table>
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
            Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Adduser />
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ fontFamily: "Imprint Mt Shadow" }} variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
