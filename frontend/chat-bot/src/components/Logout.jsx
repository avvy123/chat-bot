import { useData } from "../store/utils"
import { BiPowerOff } from 'react-icons/bi'

const Logout = () => {
  const { handleLogout } = useData()
  return (
    <>
      <button onClick={handleLogout} className="flex justify-center items-center bg-[#4e0eff] p-1 border-none cursor-pointer rounded-md">
        <BiPowerOff className="text-[#ebe7ff] text-xl" />
      </button>
    </>
  )
}

export default Logout