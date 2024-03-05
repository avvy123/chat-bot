import PropTypes from 'prop-types'
import { useData } from '../store/utils'
import { useEffect } from 'react'
import People_together from '../assets/People_together.svg.png'


const Contacts = ({ contacts, changeChat }) => {
  const { currentUser, currentUsername, currentUserImage, setCurrentUserImage, setCurrentUsername, currentChatSelected, setCurrentChatSelected } = useData()

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUsername(currentUser.username)
    }
  }, [currentUser, setCurrentUserImage, setCurrentUsername])

  const changeCurrentChat = (index, contact) => {
    setCurrentChatSelected(index)
    changeChat(contact)
  }
  return (
    <>
      {
        currentUserImage && currentUsername && (
          <div style={{ display: "grid", gridTemplateRows: "10% 75% 15%", overflow: "hidden", backgroundColor: "#080420" }}>
            <div className='flex justify-center items-center mt-5 mb-5'>
              <img src={People_together} alt="Get Together" className='h-10' />
              <h3 className='text-white uppercase'>Get Together</h3>
            </div>
            <div className='flex flex-col items-center overflow-auto'>
              <style>
                {
                  `::-webkit-scrollbar {
                    width: 0.2rem
                  }
                  ::-webkit-scrollbar-thumb {
                    background-color: #ffffff39;
                    width: 0.1rem;
                    border-radius: 1rem
                  }
                  `
                }
              </style>
              {
                contacts.map((contact, index) => {
                  return (
                    <div
                      className={`flex items-center mb-5 gap-5 bg-[#ffffff39] min-h-14 p-1 rounded-md w-[95%] cursor-pointer transition duration-500 ease-in-out ${index === currentChatSelected ? "selected" : ""}`}
                      key={index}
                      onClick={() => changeCurrentChat(index, contact)}
                    >

                      <div>
                        <img
                          src={`data:image/svg+xml;base64, ${contact.avatarImage}`}
                          alt="avatar"
                          className='h-10'
                        />
                      </div>
                      <div>
                        <h3 className='text-white'>{contact.username}</h3>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='flex items-center bg-[#0d0d30] p-1 rounded-md min-h-14 gap-5'>
              <div>
                <img
                  src={`data:image/svg+xml;base64, ${currentUserImage}`}
                  alt="avatar"
                  className='h-10'
                />
              </div>
              <div>
                <h2 className='text-white'>{currentUsername}</h2>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

Contacts.propTypes = {
  contacts: PropTypes.array,
  currentUser: PropTypes.object,
  changeChat: PropTypes.func
}

export default Contacts