import React, { useState, useEffect } from 'react'
import axios from 'axios'
import  { useNavigate } from 'react-router-dom'

const Profile = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const getAuthenticatedUser = async () => {
    try {
      const res = await axios.get("/user")
      const user = res.data
      setUser(user)
    } catch (error) {
      navigate("/login")
    }
  }

  useEffect(() => {
    getAuthenticatedUser()
  }, [])

  return (
    <div className='container'>
      <h1>User data:</h1>
      <p>Name: <strong>{user.name}</strong></p>
      <p>ID card number: <strong>{user.cardNum}</strong></p>
    </div>
  )
}

export default Profile
