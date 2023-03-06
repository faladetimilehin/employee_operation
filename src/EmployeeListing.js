import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const EmployeeListing = () => {
  const [employeeData, setEmployeeData] = useState("")
  const navigate = useNavigate()

  const LoadEdit = (id) => {
    navigate(`employee/edit/${id}`)
  }

  const LoadDetail = (id) => {
    navigate(`/employee/detail/${id}`)
  }

  const Remove = (id) => {
    if (window.confirm('Do you want to remove?')) {

      fetch(`http://localhost:8000/employee/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(employeeData)
      }).then((res) => {
        window.location.reload()
        toast.success(`Removed Successfully`)
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }
  useEffect(() => {
    fetch("http://localhost:8000/employee").then((res) => {
      return res.json()
    }).then((resp) => {
      console.log(resp)
      setEmployeeData(resp)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [])
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-title'>
          <h1> Employee Listing</h1>
        </div>
        <div className='card-body'>
          <div className='divbtn'>
            <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Address</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                employeeData && employeeData.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      <a onClick={() => { LoadEdit(user.id) }}
                        className='btn btn-success'>
                        Edit
                      </a>
                      <a onClick={() => { Remove(user.id) }}
                        className='btn btn-danger'>
                        Remove
                      </a>
                      <a onClick={() => { LoadDetail(user.id) }}
                        className='btn btn-primary'>
                        Details
                      </a>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div>
        </div>
      </div>

    </div>
  )
}

export default EmployeeListing