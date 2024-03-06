import styled from "styled-components"
import { useData } from "../store/utils"
import ChatInput from "./ChatInput"
import Logout from "./Logout"
import axios from "axios"
import { useEffect } from "react"
import { getAllMessage } from "../utils/API Routes"
import PropTypes from 'prop-types'

const ChatContainer = ({ currentUser, currentChatSelected }) => {

  const { userMessage, setUserMessage } = useData()

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.post(getAllMessage, {
          from: currentUser._id,
          to: currentChatSelected._id
        })
        setUserMessage(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error in fetching messages", error)
      }
    }
    fetchMessage()
  }, [currentUser, currentChatSelected, setUserMessage])
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
            <Container>
              <div className="chat-messages">
                {
                  userMessage.map((message, index) => {
                    return (
                      <div key={index}>
                        <div className={`message ${message.fromSelf ? "sender" : "received"}`}>
                          <div className="content">
                            <p>{message.userMessage}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Container>
            <ChatInput />
          </div>
        )
      }
    </>
  )
}

ChatContainer.propTypes = {
  currentUser: PropTypes.object,
  currentChatSelected: PropTypes.object
}

const Container = styled.div`

`

export default ChatContainer