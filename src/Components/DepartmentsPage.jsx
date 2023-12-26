// DepartmentsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const DepartmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [errorMessage, setErrorMessage] = useState('');
  const [departments, setDepartments] = useState([]);
  const [editedName, setEditedName] = useState({
    name: ''
  });
  const [newDepartment, setNewDepartment] = useState({
    name: '',
  });
  const [editDepartment, setEditDepartment] = useState(null);
  console.log("edit", editDepartment)
  const userData = useSelector((state) => state.userData);
  console.log(userData)
  const token = userData.token;
  const userId = userData.userId;
  console.log(token, userId)
  console.log(newDepartment)

  useEffect(() => {
    // Fetch departments from your API and update the state
    fetch(`http://localhost:3001/departments/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          const allData = result.allData;
          setDepartments(allData);
        } else {
          setErrorMessage('Failed to fetch department data');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, [userId, token]);



  const handleCreateDepartment = () => {
    fetch(`http://localhost:3001/departments/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newDepartment),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          console.log(result);
          const allData = result.allData;
          setDepartments(allData);
          setNewDepartment({
            name: ''
          })
        }
        else {
          setErrorMessage('Please validate your data');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const handleUpdateDepartment = (departmentId) => {
    console.log("id is here", departmentId);

    if (
      editedName.name.trim() === ''
    ) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    fetch(`http://localhost:3001/departments/${userId}/${departmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedName),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          console.log("result", result);
          const allData = result.allData;
          setDepartments(allData);
        }
        else {
          setErrorMessage('Please validate your data');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });


    setEditDepartment(null); // Reset edit mode

  };


  const handleDeleteDepartment = (departmentId) => {
    console.log(departmentId)
    // Send a request to delete the department
    fetch(`http://localhost:3001/departments/${userId}/${departmentId}`, {
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
          setDepartments(allData);
        } else {
          setErrorMessage('Failed to delete department');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  };




  const createNewOne = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log(name, value);

  }

  const editingName = (e) => {
    const { name, value } = e.target;
    setEditedName((prevData) => ({
      ...prevData,
      [name]: value
    }))
    console.log(name, value);
    setErrorMessage('');
  }

  const offset = currentPage * itemsPerPage;
  const currentPageData = departments.slice(offset, offset + itemsPerPage);

  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Departments</h1>
      <div className="mt-5">
        <input
          type="text"
          name="name"
          placeholder="New Department Name"
          value={newDepartment.name}
          onChange={createNewOne}
          className="mr-2 border-b border-gray-500"
        />
        <button onClick={handleCreateDepartment} className="text-green-500 mb-20">
          Create
        </button>
      </div>

      <div>{errorMessage && (
        <div className="mt-10 mb-10 text-red-500 font-bold text-center">{errorMessage}</div>
      )}</div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Done By
            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((department) => (
            <tr key={department._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                {editDepartment === department._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedName.name}
                    onChange={editingName}
                    className="mr-2 border-b border-gray-500"
                  />
                ) : (
                  <span>{department.name}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{department.doneBy}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{formatDate(department.createdAt)}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">
                {editDepartment === department._id ? (
                  <button onClick={() => handleUpdateDepartment(department._id)} className="text-blue-500">
                    Save
                  </button>
                ) : (
                  <button onClick={() => setEditDepartment(department._id, department.name)} className="text-blue-500">
                    Edit
                  </button>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDeleteDepartment(department._id)} className="text-red-500 ml-2">
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

export default DepartmentsPage;
