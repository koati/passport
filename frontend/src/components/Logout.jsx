import axios from 'axios'
import  { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  
  const logout = (async () => {
    try {
      await axios.delete('/logout')
    } catch (error) {
      return false
    } finally {
      navigate("/")
    }
  })()

  return null
}

export default Logout
