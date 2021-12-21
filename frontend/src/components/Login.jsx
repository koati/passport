import React, { useState } from 'react'
import axios from 'axios'
import  { useNavigate } from 'react-router-dom'

const Login = () => {
  const [cardNum, setCardNum] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/login', {cardNum, password})
      setErrorMessage('')
      navigate("/profile")
    } catch (error) {
      setErrorMessage(error.response.statusText)
    }    
  }

  return (
    <div className='container login'>
      <form onSubmit={handleSubmit}>
        <label>
          ID card number:
          <input type="text" value={cardNum} onChange={e => setCardNum(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Login" />
        { errorMessage && <p className='error'>{ errorMessage }</p> }
      </form>
    </div>
  )
}

export default Login
