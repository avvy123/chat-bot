import { BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import { useData } from '../store/utils'
import EmojiPicker from "emoji-picker-react"
import Theme from "emoji-picker-react"

const ChatInput = () => {
  const { showEmojiPicker, handleEmojiPicker, handleEmojiSelect, displayMessage, setDisplayMessage, handleSendChat } = useData()
  return (
    <div style={{ display: "grid", gridTemplateColumns: "5% 95%", alignItems: "center", padding: "0 2rem", paddingBottom: "0.3rem", gap: "10px" }}>
      <div className='flex items-center gap-2 text-white'>
        <div className='relative text-2xl text-[#ffff00c8] cursor-pointer'>
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          <div className='absolute top-[-350px]'>
            {
              showEmojiPicker &&
              <Theme theme="dark" height={300} onEmojiClick={handleEmojiSelect}>
                <EmojiPicker />
              </Theme>
            }
          </div>
        </div>
      </div>
      <form className='flex items-center rounded-full h-full bg-[#ffffff34]' onSubmit={(e) => handleSendChat(e)}>
        <input
          type="text"
          placeholder='Type your message.....'
          className='w-11/12  bg-transparent border-none text-white focus:outline-none py-1 pl-2 placeholder:text-white'
          value={displayMessage}
          onChange={(e) => setDisplayMessage(e.target.value)}
        />
        <button className='flex justify-center items-center border-none rounded-full'>
          <IoMdSend className='text-2xl text-white' />
        </button>
      </form>
    </div>
  )
}

export default ChatInput