import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const EmployeeEdit = () => {
  const { id } = useParams();
  const { employeeData, setEmployeeData } = useState({});

  const [Id, setId] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [validation, setValidation] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    fetch(`http://localhost:8000/employee/${id}`).then((res) => {
      return res.json()
    }).then((resp) => {
      console.log(resp)
      setId(resp.id)
      setName(resp.name)
      setEmail(resp.email)
      setPhone(resp.phone)
      setAddress(resp.address)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const employeeData = { id: Id, name, email, phone, address, isActive }
    console.log(employeeData, 'new ')

    fetch(`http://localhost:8000/employee/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(employeeData)
    }).then((res) => {
      toast.success(`Edited Successfully`)
      navigate('/')
    }).catch((err) => {
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
                <h2>Employee Edit</h2>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>ID</label>
                      <input value={Id}
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
        </div>
      </div >

    </>
  )

}
export default EmployeeEdit