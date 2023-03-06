import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const EmployeeDetail = () => {
  const { id } = useParams()
  const [employeeData, setEmployeeData] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8000/employee/${id}`).then((res) => {
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
          <h2>Employee Details</h2>
        </div>
        <div className='card-body'>
          {
            employeeData &&
            <div>
              <h2>
                The Employee name is : {employeeData.name} ({employeeData.id})
              </h2>
              <h3>Contact Details</h3>
              <h5>Email is : {employeeData.email}</h5>
              <h5>Phone is: {employeeData.phone}</h5>
              <Link className='btn btn-danger' to="/">Back to Listing</Link>
            </div>
          }

        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default EmployeeDetail