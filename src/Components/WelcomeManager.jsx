import { react, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


const WelcomePage = () => {
  const navigate = useNavigate();




  const managersignIn = ()=>{
    navigate('/loginManager');
  }

  return (
    <div>
    <div className="container mx-auto mt-40 text-center">
      <h1 className="text-3xl font-bold mb-4 ">Welcome to Our Website!!!</h1>
 
      <p className="text-lg mb-8 "> Explore the opportunities and join our team!</p>


    
       
       <button className='h-10 w-1/2 text-white border-2 rounded-full bg-blue-900' onClick={managersignIn}>Login Account</button>

      
    </div >
  
    </div>
  );
};






export default WelcomePage;