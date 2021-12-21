import React, { useState } from 'react'
import axios from 'axios'
import  { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/register', {name, password, cardNum})
      setErrorMessage('')
      navigate("/login")
    } catch (error) {
      setErrorMessage(error.response.statusText)
    }    
  }

  return (
    <div className='container register'>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          ID card number:
          <input type="text" value={cardNum} onChange={e => setCardNum(e.target.value)} />
        </label>
        <input type="submit" value="Register" />
        { errorMessage && <p className='error'>{ errorMessage }</p> }
      </form>
    </div>
  )
}

export default Register
