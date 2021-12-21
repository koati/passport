import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  const [users, setUsers] = useState([])

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/users")
      const users = res.data
      setUsers(users)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  
  return (
    <div className='container home'>
      <h1>This is the Passport Project</h1>
      <h2>Registered Users:</h2>
      <div className='user-container'>
        { users.map(user => <div className='user'>{user.name}</div>) }
      </div>
    </div>
  )
}

export default Home
