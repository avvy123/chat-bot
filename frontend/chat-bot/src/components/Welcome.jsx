import robot from '../assets/robot.gif'
import { useData } from '../store/utils'

const Welcome = () => {
  const { currentUser } = useData()
  return (
    <>
      <div className='flex flex-col justify-center items-center text-white font-medium'>
        <img src={robot} alt="robot" className='h-80' />
        <h1>Welcome, <span className='text-[#4e0eff]'>{currentUser.username}!</span></h1>
        <h3>Please select a chat to Start Messaging</h3>
      </div>
    </>
  )
}

export default Welcome