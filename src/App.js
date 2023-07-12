import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import AdminUsers from './pages/AdminUsers';
import AddUser from './Users/AddUser';
import AdminLogin from './component/AdminLogin';
import UserLogin from './component/userLogin';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminIndex from './pages/AdminIndex';
import AdminDashboard from './pages/AdminDashboard';
import AdminSubject from './pages/subjects';
import AdminQuestion from './pages/AdminQuestions';
import EditSubject from './pages/editSubject';
import AdminTest from './pages/AdminTests';
import EditUser from './pages/editUser';
import AddTest from './pages/AddTest';
import DevInfo from './component/DevInfo';
import EditTest from './pages/EditTest';
import TestQuestion from './pages/TestQuetion';
import UserIndexPage from './pages/UserIndexPage';
import ActiveTests from './Users/ActiveTests';
import TestInstrct from './Users/TestInstrct';
import TestLandingPage from './Users/TestLandingPage';
import TestResultPage from './Users/TestResultPage';
import UserReport from './Users/UserReport';
import UserTestReports from './Users/UserTestReports';
import UserAllReports from './Users/UserAllReports';
import AdminUserRepots from './pages/AdminUserRepots';
import AdminUserTestRp from './pages/AdminUserTestRp';
import AdminDetailRp from './pages/AdminDetailRp';
import AddQuestion from './pages/AddQuestion';
import UpdateQuestion from './pages/UpdateQuestion';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allUsers" element={<AdminUsers />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<EditUser/>}/>

          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/userLogin" element={<UserLogin />} />

          <Route path="/admin-index" element={<AdminIndex/>}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/adminSubject" element={<AdminSubject/>}/>
          <Route path="/adminQuestion" element={<AdminQuestion/>}/>
          <Route path='/editsubject/:subId' element={<EditSubject/>}/>
          <Route path='/adminTests' element = {<AdminTest/>}/>
          <Route path='/addTest' element ={<AddTest/>}/>
          <Route path='/editTest/:id' element = {<EditTest/>}/>
          <Route path='/testQuestion/:id' element = {<TestQuestion/>}/>
          <Route path='/developerInfo' element={<DevInfo/>}/>

          <Route path='/addQuestion/:id' element={<AddQuestion/>}/>
          <Route path='/updateQuestion/:id' element={<UpdateQuestion/>}/>

          <Route path = '/userReports/:id' element={<AdminUserRepots/>}/>
          <Route path='/userReports/:uId/test/:tId' element={<AdminUserTestRp/>}/>
          <Route path='/adminReports/:id' element = {<AdminDetailRp/>}/>

          <Route path='/userIndex' element={<UserIndexPage/>}/>
          <Route path='/activeTests' element ={<ActiveTests/>}/>
          <Route path='/testInstruct/:id' element={<TestInstrct/>}/>
          <Route path='/testStart/:id' element={<TestLandingPage/>}/>
          <Route path='/testResult/:id' element={<TestResultPage/>}/>
          <Route path='/testReport/:id' element = {<UserReport/>}/>
          <Route path='/userReport' element = {<UserTestReports/>}/>
          <Route path='/allReports/:id' element = {<UserAllReports/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
