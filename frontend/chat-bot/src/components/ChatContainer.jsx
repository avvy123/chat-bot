import { useData } from "../store/utils"
import ChatInput from "./ChatInput"
import Logout from "./Logout"
import Messages from "./Messages"

const ChatContainer = () => {
  const { currentChatSelected } = useData()
  return (
    <>
      {
        currentChatSelected && (
          <div className="p-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div>
                  <img
                    src={`data:image/svg+xml;base64, ${currentChatSelected.avatarImage}`}
                    alt="avatar"
                    className='h-10'
                  />
                </div>
                <div>
                  <h3 className="text-white">{currentChatSelected.username}</h3>
                </div>
              </div>
              <Logout />
            </div>
            <Messages />
            <ChatInput />
          </div>
        )
      }
    </>
  )
}

export default ChatContainer