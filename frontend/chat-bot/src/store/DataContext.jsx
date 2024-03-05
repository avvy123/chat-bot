import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { login, register, setAvatar } from '../utils/API Routes'
import { useNavigate } from 'react-router-dom'
import { Buffer } from "buffer"

export const DataContext = createContext()

const DataProvider = ({ children }) => {
  const navigate = useNavigate()
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [loginUser, setLoginUser] = useState({
    username: "",
    password: ""
  })

  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)

  const toastOptions = {
    position: "bottom-right",
    autoClose: "5000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const api = "https://api.multiavatar.com/4589621"

  useEffect(() => {
    const fetchData = async () => {
      const data = []
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
        const buffer = new Buffer(image.data)
        data.push(buffer.toString("base64"))
      }
      setAvatars(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

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

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    if (handleLoginValidation()) {
      const { username, password } = loginUser
      const { data } = await axios.post(login, {
        username, password
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

  const handleLoginValidation = () => {
    const { username, password } = loginUser
    if (password === "") {
      toast.error("Incorrect username or password", toastOptions)
      return false
    }
    else if (username.length === "") {
      toast.error("Email and password is required", toastOptions)
      return false
    }
    return true
  }


  const handleRegisterChange = (event) => {
    setRegisterUser({ ...registerUser, [event.target.name]: event.target.value })
  }

  const handleLoginChange = (event) => {
    setLoginUser({ ...loginUser, [event.target.name]: event.target.value })
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))
      const { data } = await axios.post(`${setAvatar}/${user._id}`, {
        image: avatars[selectedAvatar]
      })
      if (data.isSet) {
        user.isAvatarImageSet = true
        user.avatarImag = data.image
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate("/")
      } else {
        toast.error("Error in setting avatar, please try again later", toastOptions)
      }
    }
  }

  return (
    <DataContext.Provider value={{ handleRegisterChange, handleLoginChange, registerUser, handleRegisterSubmit, loginUser, handleLoginSubmit, avatars, navigate, selectedAvatar, setSelectedAvatar, setProfilePicture, isLoading }}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.array
}

export default DataProvider