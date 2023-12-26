// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './Components/Home';
import SignUpPage from "./Components/SignUpPage";
// import AboutYou from './Components/AboutYou';
// import Verification from './Components/Verification';
// import CheckValid from './Components/CheckValid';
// import DashBoard from './Components/DashBoard';
import LoginPage from './Components/LoginPage';
import DepartmentsPage from './Components/DepartmentsPage';
import SignUpPageManager from './Components/SignUpPageManager';
import LoginPageManager from './Components/LoginPageManager';
import WelcomePage from './Components/WelcomePage';
import WelcomeManager from './Components/WelcomeManager';
import ManagerDashboard from './Components/ManagerDashboard';
import GetAllEmployees from './Components/GetAllEmployees';
import EmployeeDashboard from './Components/EmployeeDashboard';
// import EmployerDashboard from './Components/Dashboard/employerDashboard';

const App = () => {
  return (
      <div>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/signupEmp" element={<SignUpPage/>}/>
          <Route path="/loginEmp" element={<LoginPage/>}/>
          <Route path="/signupManager" element={<SignUpPageManager/>}/>
          <Route path="/loginManager" element={<LoginPageManager/>}/>
          <Route path="/departments" element={<DepartmentsPage/>}/>
          <Route path="/welcome" element={<WelcomePage/>}/>
          <Route path="/welcomeManager" element={<WelcomeManager/>}/>
          <Route path="/managerDashboard" element={<ManagerDashboard/>}/>
          <Route path="/allemployees" element={<GetAllEmployees/>}/>
          <Route path="/employeeDashboard" element={<EmployeeDashboard/>}/>


        </Routes>
      </div>
  );
};

export default App;




