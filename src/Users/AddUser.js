import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  let navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNo: ""
  });
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Admin/users");
      setAllUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { username, email, phoneNo } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "phoneNo") {
      if (!/^[6-9]\d{9}$/.test(value)) {
        setPhoneError("Phone number should have exactly 10 digits and start with 6, 7, 8, or 9.");
      } else {
        setPhoneError("");
  
        const existingUser = allUsers.find((user) => user.phoneNo === value);
        if (existingUser) {
          setPhoneError("Phone number already exists.");
        }
      }
    }

    if (name === "email") {
      const existingUser = allUsers.find((user) => user.email === value);
      if (existingUser) {
        setEmailError("Email address already exists.");
      } else {
        setEmailError("");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (emailError !== "" || phoneError !== "") {
      return; // Return early if there are validation errors
    }
    
    await axios.post("http://localhost:8080/Admin/user", user);
    setUser({ username: "", email: "", phoneNo: "" });
    setEmailError("");
    setPhoneError("");
    navigate("/allUsers");
    window.location.reload(); // Refresh the screen
  };

  return (
    <div className="container">
      <div className="row">
        <div className="border rounded">
          <h3 className="text-center">Add User</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the user name"
                name="username"
                value={username}
                required
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                name="email"
                value={email}
                required
                onChange={onInputChange}
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the phone number"
                name="phoneNo"
                value={phoneNo}
                required
                onChange={onInputChange}
              />
              {phoneError && <div className="text-danger">{phoneError}</div>}
            </div>
            <Button
              type="submit"
              style={{ fontFamily: 'Imprint Mt Shadow', borderRadius: '10px' }}
              className="btnn btn-primary mb-3 text-center"
              disabled={emailError !== "" || phoneError !== ""}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
