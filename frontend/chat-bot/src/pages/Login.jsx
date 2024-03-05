import { useEffect } from 'react'
import People_together from '../assets/People_together.svg.png'
import { useData } from "../store/utils"
// import Register from './Register'

const Login = () => {
  const { loginUser, handleLoginChange, handleLoginSubmit, navigate } = useData()

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  })

  return (
    <>
      <form className="flex justify-center items-center h-screen bg-[#131324]" onSubmit={handleLoginSubmit}>
        <div className="flex flex-col bg-[#00000076] px-16 py-10 rounded-lg">
          <div className="flex items-center gap-3 mb-5">
            <img src={People_together} alt="get together logo" className="h-10" />
            <h1 className="text-2xl font-md text-white uppercase">Get Together</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="bg-transparent text-white mb-5 rounded-md p-2 w-full border-[1px] border-[#4e0eff]"
            autoComplete="off"
            value={loginUser.username}
            onChange={handleLoginChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="bg-transparent text-white mb-5 rounded-md p-2 w-full border-[1px] border-[#4e0eff]"
            value={loginUser.password}
            onChange={handleLoginChange}
          />

          <button
            type="submit"
            className="bg-violet-900 px-6 py-2 rounded-md text-md text-white font-md mb-10 uppercase"
          >
            Log In
          </button>
          <span className="text-white text-center uppercase">Don&apos;t have an account?</span>
        </div>
      </form>
    </>
  )
}

export default Login