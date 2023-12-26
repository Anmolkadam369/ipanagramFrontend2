import React, { useState } from 'react';
import { faBell, faSearch, faUserCircle, faUsers, faSignOutAlt, faCog, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DepartmentsPage from './DepartmentsPage';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EmployeeDashboard() {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);
    console.log(userData)
    const token = userData.token;
    const userId = userData.userId;
    console.log(token , userId)

  const [showData, setShowData]=useState(false);
  const [comingData, setComingData]=useState({})

 
  
  const profileData=()=>{
    fetch(`http://localhost:3001/employee/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          console.log(result);
          let data = result.data;
          setComingData(data)
        }
        else {
          setErrorMessage('There is problem getting data :(');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
    setShowData(!showData)
  }

  return (
    <>
      <div className='h-full'>
        <div className='rounded-lg bg-white p-10 flex relative border-b-4 border-blue-900'>
         
          <div className='absolute top-2 right-8 ' >
            <FontAwesomeIcon icon={faUserCircle} size='3x' className='text-zinc-600 p-2' title="Profile" onClick={profileData}/>
          </div>
          {showData &&(
             <div className="">
       
             <div className="group">
               <button className="absolute top-2 right-8 ">
               <FontAwesomeIcon icon={faUserCircle} size='3x' className='text-zinc-600 p-2' title="Profile"/>
               </button>
               <ul className="mt-6 absolute hidden bg-white shadow-lg space-y-3 py-4 px-6 right-0 rounded-xl group-hover:block">
                 <li className=" hover:rounded-lg p-1  font-bold" >
                   <Link>
                   firstName : {comingData.firstName}
                   </Link>
                 </li>
                 <li className=" hover:rounded-lg p-1  font-bold" >
                   <Link>lastName : {comingData.lastName}</Link>
                 </li>
                 <li className=" hover:rounded-lg p-1  font-bold" >
                   <Link>Designation : {comingData.designation}</Link>
                 </li>
                 <li className=" hover:rounded-lg p-1  font-bold" >
                   <Link>Location : {comingData.location}</Link>
                 </li>
                 
               </ul>
             </div>
           </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center   mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center mt-20">
        Welcome Employee, {comingData.firstName}
      </h1>

      <p className="text-center mb-4">
        You are an essential part of our team. Your hard work and dedication
        make a significant impact. Let's achieve great things together!
      </p>

      <p className="text-center mb-4">
        Click on profile Icon to see your data!
      </p>
    </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;