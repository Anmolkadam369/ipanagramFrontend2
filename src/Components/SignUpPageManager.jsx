import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useParams } from 'react-router-dom';
// import { useAuth } from './AuthContext';

function SignUpPage() {

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  ;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: ''
  });

  function validateForm() {
    let valid = true;
    const errors = {};
    console.log(errors)

    if (!formData.firstName.trim()) {
      errors.email = 'first name is required';
      valid = false;
    }
    if (!formData.lastName.trim()) {
      errors.email = 'last name is required';
      valid = false;
    }
    if (!formData.location.trim()) {
      errors.email = 'location is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      valid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
      valid = false;
    }


    setFormErrors(errors);
    return valid;
  }

  function createAccount() {

    if (!validateForm()) {
      return;
    }

    console.log(formData);
    localStorage.setItem('formData', JSON.stringify(formData));

    fetch('http://localhost:3001/managersignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          setSuccessMessage(`${result.data.firstName} Registered successfully!`);
          setErrorMessage('');
          setTimeout(() => {
            navigate('/welcomeManager');
          }, 3000);
        }
        else {
          setErrorMessage('this is already registered. Please choose a different.');
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);
  };

  return (
    <div>

      <div className='text-center'>
        <h1 className='text-center mt-10 text-3xl font-extrabold '>Join Our Team Manager</h1>
        <h1 className='text-center mt-5'>Sign up</h1>

        <input
          type="text"
          name="firstName"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='First Name'
          onChange={handleInputChange}
          value={formData.firstName}
          required
        />
        {formErrors.firstName && <div className="text-red-500 mt-2">{formErrors.firstName}</div>}

        <input
          type="text"
          name="lastName"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='Last Name'
          onChange={handleInputChange}
          value={formData.lastName}
          required
        />
        {formErrors.lastName && <div className="text-red-500 mt-2">{formErrors.lastName}</div>}

        <input
          type="text"
          name="email"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type='password'
          name="password"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        {formErrors.password && <div className="text-red-500 mt-2">{formErrors.password}</div>}

        <input
          type='text'
          name="location"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='Location'
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        {formErrors.location && <div className="text-red-500 mt-2">{formErrors.location}</div>}

        {formErrors.email && <div className="text-red-500 mt-2">{formErrors.email}</div>}

        <button className='mt-10 h-10 w-1/2 text-white border-2 rounded-full bg-blue-900' onClick={createAccount}>Create Account</button>

        {errorMessage && (
          <div className="text-red-500 mt-2">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <h1 className="text-green-500 mt-2 font-bold text-m">
            {successMessage}
          </h1>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;





