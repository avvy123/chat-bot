import { useEffect } from 'react'
import People_together from '../assets/People_together.svg.png'
import { useData } from "../store/utils"

const Register = () => {
  const { registerUser, handleRegisterChange, handleRegisterSubmit, navigate } = useData()

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  })
  return (
    <>
      <form className="flex justify-center items-center h-screen bg-[#131324]" onSubmit={handleRegisterSubmit}>
        <div className="flex flex-col bg-[#00000076] px-16 py-8 rounded-lg">
          <div className="flex items-center gap-3 mb-5">
            <img src={People_together} alt="get together logo" className="h-10" />
            <h1 className="text-2xl font-md text-white uppercase">Get Together</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="bg-transparent text-white mb-5 rounded-md p-1 w-full border-[1px] border-[#4e0eff]"
            autoComplete="off"
            value={registerUser.username}
            onChange={handleRegisterChange}
          />
          <input
            type="email"
            placeholder="abc@example.com"
            name="email"
            className="bg-transparent text-white mb-5 rounded-md p-1 w-full border-[1px] border-[#4e0eff]"
            autoComplete="off"
            value={registerUser.email}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="bg-transparent text-white mb-5 rounded-md p-1 w-full border-[1px] border-[#4e0eff]"
            value={registerUser.password}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="bg-transparent text-white mb-5 rounded-md p-1 w-full border-[1px] border-[#4e0eff]"
            value={registerUser.confirmPassword}
            onChange={handleRegisterChange}
          />
          <button
            type="submit"
            className="bg-violet-900 px-6 py-1 rounded-md text-md text-white font-md mb-2 uppercase"
          >
            Create User
          </button>
          <span className="text-white text-center">Already have an account?</span>
        </div>
      </form>
    </>
  )
}

export default Register