import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const EmployeeCreate = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [validation, setValidation] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const employeeData = { id, name, email, phone, address, isActive }

    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(employeeData)
    }).then((res) => {
      toast.success(`Employee Created`)
      navigate('/')
    }).catch((err) => {
      toast.error(err.message)
      console.log(err.message)
    })
  }
  return (
    <>
      <div className='row'>
        <div className='offset-lg-3 col-lg-6' >
          <form className='container' onSubmit={handleSubmit}>
            <div className='card' style={{ "textAlign": "center" }}>
              <div className='card-title'>
                <h2>   EmployeeCreate   </h2>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>ID</label>
                      <input value={id}
                        onChange={e => setId(e.target.value)}
                        disabled className='form-control'></input>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Name</label>
                      <input required
                        value={name}
                        onMouseDown={e => setValidation(true)}
                        onChange={e => setName(e.target.value)}
                        className='form-control'></input>
                      {name.length === 0 && validation && < span className='text-danger'>Enter the name </span>}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Email</label>
                      <input required type="email" value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='form-control'></input>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className='form-control'></input>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Address</label>
                      <input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className='form-control'></input>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-check'>
                      <input
                        checked={isActive}
                        onChange={e => setIsActive(e.target.checked)}
                        type="checkbox" className='form-check-input'></input>
                      <label className='form-check-label'>Is Active</label>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <button className='btn btn-success '>Save</button>
                      <Link to="/" className='btn btn-danger'>Back</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>      </div >

    </>
  )
}

export default EmployeeCreate