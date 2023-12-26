import { react, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const empReg = ()=>{
    navigate('/signupEmp');
  }

  const empsignIn = ()=>{
    navigate('/loginEmp');
  }
  const managerReg = ()=>{
    navigate('/signupManager');
  }
  const managersignIn = ()=>{
    navigate('/loginManager');
  }

  return (
    <div className="container mx-auto mt-8 text-center sm:mt-20">
      <h1 className="text-3xl font-bold mb-4 sm:text-4xl md:mb-8">Welcome to Our Website</h1>
      <div className="mt-4 sm:mt-8 text-lg sm:mb-8">
        Explore the opportunities and join our team!
      </div>

      <div className="mt-4 sm:mt-8 relative inline-block text-left">
        <div className="group">
          <button className="text-white bg-blue-900 px-6 py-2 text-sm font-bold rounded-lg hover:bg-red-500 sm:px-8 md:px-10">
            START
          </button>
          <ul className="absolute hidden bg-white shadow-lg space-y-2 py-2 px-4 right-0 rounded-xl group-hover:block">
            <li className="hover:text-white hover:bg-blue-900 hover:rounded-lg p-1 text-sm font-bold" onClick={empReg}>
              <Link to="/employers/auth/registration">EMPLOYEE REGISTRATION</Link>
            </li>
            <li className="hover:text-white hover:bg-blue-900 hover:rounded-lg p-1 text-sm font-bold" onClick={empsignIn}>
              <Link to="/employers/auth/login">EMPLOYEE LOGIN</Link>
            </li>
            <li className="hover:text-white hover:bg-blue-900 hover:rounded-lg p-1 text-sm font-bold" onClick={managerReg}>
              <Link to="/auth/registration">MANAGER REGISTRATION</Link>
            </li>
            <li className="hover:text-white hover:bg-blue-900 hover:rounded-lg p-1 text-sm font-bold" onClick={managersignIn}>
              <Link to="/auth/login">MANAGER LOGIN</Link>
            </li>
          </ul>
        </div>
      </div>

      
    </div>
  );
};






export default Home;