import styled from 'styled-components'
import { useData } from '../store/utils'
import { useEffect } from 'react'
import { allUsers } from '../utils/API Routes'
import Contacts from '../components/Contacts'
import axios from 'axios'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'

const Chat = () => {
  const { currentUser, setCurrentUser, navigate, contacts, setContacts, handleChatChange, isLoaded, setIsLoaded, currentChatSelected } = useData()

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login")
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setIsLoaded(true)
      }
    }
    checkUser()
  }, [navigate, setCurrentUser, setIsLoaded])

  useEffect(() => {
    const checkCurrentUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsers}/${currentUser._id}`)
          setContacts(data.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    checkCurrentUser()
  }, [currentUser, navigate, setContacts])
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
          isLoaded && currentChatSelected === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer />
          )
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat