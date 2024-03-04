import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { register } from '../utils/API Routes'
import { useNavigate } from 'react-router-dom'

export const DataContext = createContext()

const DataProvider = ({ children }) => {
  const navigate = useNavigate()
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: "5000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    if (handleRegisterValidation()) {
      const { username, email, password } = registerUser
      const { data } = await axios.post(register, {
        username, email, password
      })
      if (data.status === false) {
        toast.error(data.message, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        navigate("/")
      }
    }
  }


  const handleRegisterValidation = () => {
    const { username, email, password, confirmPassword } = registerUser
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions)
      return false
    }
    else if (email === "") {
      toast.error("Please enter a valid email", toastOptions)
      return false
    }
    else if (password.length < 8) {
      toast.error("Password should be equal or more than 8 characters")
      return false
    }
    else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password is not same", toastOptions)
      return false
    }
    return true
  }


  const handleChange = (event) => {
    setRegisterUser({ ...registerUser, [event.target.name]: event.target.value })
  }

  return (
    <DataContext.Provider value={{ handleChange, registerUser, handleRegisterSubmit }}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.array
}

export default DataProvider