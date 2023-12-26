import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 5;
const GetAllEmployees = () => {

  const [editedInfo, setEditedInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    department: '',
    location: '',
    designation: ''
  })
  const [editEmployee, setEditEmployee] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [employeeData, setEmployeeData] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const userData = useSelector((state) => state.userData);
  console.log(userData)
  const token = userData.token;
  const userId = userData.userId;
  console.log(token, userId)
  const totalPages = Math.ceil(employeeData.length / PAGE_SIZE);


  useEffect(() => {
    // Fetch employees from your API and update the state
    fetch(`http://localhost:3001/employees/${userId}`, {
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
          const allData = result.data;
          setEmployeeData(allData);
        } else {
          setErrorMessage('There is a problem getting data :(');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, [userId, token]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const paginatedData = employeeData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const byLocation = () => {
    fetch(`http://localhost:3001/sortedByLocation/${userId}`, {
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
          const allData = result.data;
          setEmployeeData(allData);
        }
        else {
          setErrorMessage('There is problem getting data :(');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }

  const byName = (filter) => {
    fetch(`http://localhost:3001/sortedByName/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ filter: filter }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          console.log(result);
          const allData = result.data;
          setEmployeeData(allData);
        }
        else {
          setErrorMessage('There is problem getting data :(');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }

  const handleUpdateEmployee = (employeeId) => {
    console.log("id is here", employeeId);
    if (
      editedInfo.email.trim() === '' ||
      editedInfo.firstName.trim() === '' ||
      editedInfo.lastName.trim() === '' ||
      editedInfo.department.trim() === '' ||
      editedInfo.location.trim() === '' ||
      editedInfo.designation.trim() === ''
    ) {
      // Display an error message or handle the error as needed
      setErrorMessage('Please fill in all fields.');
      return;
    }
    fetch(`http://localhost:3001/employee/${userId}/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedInfo),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          console.log("result ", result);
          const allData = result.allData;
          console.log("allData", allData)
          setEmployeeData(allData);
        }
        else {
          setErrorMessage('Please validate your data');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
    setEditEmployee(null);
  }


  const handleDeleteEmployee = (employeeId) => {
    console.log("id is here", employeeId);
    fetch(`http://localhost:3001/employee/${userId}/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          const allData = result.allData;
          setEmployeeData(allData);
        } else {
          setErrorMessage('Failed to delete employee');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }


  const updatedInfo = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevData) => ({
      ...prevData,
      [name]: value
    }))
    console.log(name, value);
    setErrorMessage('');
  }

  return (
    <div className="container mx-auto mt-10 p-8">
      <div className='flex'>
        <h1 className="text-3xl font-bold mb-20 mr-20">All Employee Data</h1>

        <div className=" relative inline-block text-left ml-20">

          <div className="group">
            <button className="text-white bg-blue-900 px-16 py-2 text-sm font-bold rounded-lg hover:bg-red-500 mr-4">
              Filter
            </button>
            <ul className="absolute hidden bg-white shadow-lg space-y-2 py-2 px-4 right-0 rounded-xl group-hover:block">

              <li className="hover:text-white hover:bg-blue-900 hover:rounded-lg p-1 text-sm font-bold" onClick={byLocation}>
                <Link> Sort by Location</Link>
              </li>
              <li className="hover:text-white hover:bg-blue-900 hover:rounded-lg p-1 text-sm font-bold" onClick={() => byName(1)}>
                <Link >Sort in Ascending (name)</Link>
              </li>
              <li className="hover:text-white hover:bg-blue-900 hover:rounded-lg p-1 text-sm font-bold" onClick={() => byName(-1)}>
                <Link>Sort in Descending (name)</Link>
              </li>
            </ul>
          </div>
        </div>



      </div>
      <div>{errorMessage && (
        <div className="mt-10 mb-10 text-red-500 font-bold text-center">{errorMessage}</div>
      )}</div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Designation
            </th>
          </tr>

        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((employee) => (
            <tr key={employee._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                {editEmployee === employee._id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedInfo.email}
                    onChange={updatedInfo}
                    className="mr-2 border-b border-gray-500"
                  />
                ) : (
                  <span>{employee.email}</span>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {editEmployee === employee._id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedInfo.firstName}
                    onChange={updatedInfo}
                    className="mr-2 border-b border-gray-500"
                  />
                ) : (
                  <span>{employee.firstName}</span>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {editEmployee === employee._id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedInfo.lastName}
                    onChange={updatedInfo}
                    className="mr-2 border-b border-gray-500"
                  />
                ) : (
                  <span>{employee.lastName}</span>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {editEmployee === employee._id ? (
                  <input
                    type="text"
                    name="department"
                    value={editedInfo.department}
                    onChange={updatedInfo}
                    className="mr-2 border-b border-gray-500"
                  />
                ) : (
                  <span>{employee.department}</span>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {editEmployee === employee._id ? (
                  <input
                    type="text"
                    name="location"
                    value={editedInfo.location}
                    onChange={updatedInfo}
                    className="mr-2 border-b border-gray-500"
                  />
                ) : (
                  <span>{employee.location}</span>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {editEmployee === employee._id ? (
                  <input
                    type="text"
                    name="designation"
                    value={editedInfo.designation}
                    onChange={updatedInfo}
                    className="mr-2 border-b border-gray-500"
                  />
                ) : (
                  <span>{employee.designation}</span>
                )}
              </td>



              <td className="px-6 py-4 whitespace-nowrap">
                {editEmployee === employee._id ? (
                  <button onClick={() => handleUpdateEmployee(employee._id)} className="text-blue-500">

                    Save
                  </button>
                ) : (
                  <button onClick={() => { setEditEmployee(employee._id); setEditedInfo(employee); }} className="text-blue-500">
                    Edit
                  </button>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDeleteEmployee(employee._id)} className="text-red-500 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 flex justify-center">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex'}
          activeClassName={'active bg-blue-500 text-white'}
          pageClassName={'ml-2 py-2 px-3 rounded-lg bg-gray-200'}
          previousClassName={'mr-2 py-2 px-3 rounded-lg bg-gray-200'}
          nextClassName={'ml-2 py-2 px-3 rounded-lg bg-gray-200'}
          breakClassName={'ml-2 py-2 px-3 rounded-lg bg-gray-200'}
        />
      </div>


    </div>

  );
};

export default GetAllEmployees;
