import { useData } from "../store/utils"
import loader from '../assets/loader.gif'
import { useEffect } from "react"

const SetAvatar = () => {
  const { avatars, selectedAvatar, setSelectedAvatar, setProfilePicture, isLoading, navigate } = useData()
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    }
  }, [navigate])
  return (
    <>
      {
        isLoading ? (
          <div className="flex items-center justify-center">
            <img src={loader} alt="loader" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-[#131312] h-screen w-screen">
            <div>
              <h1 className="text-4xl text-white mb-10">Pick an avatar as your profile picture</h1>
            </div>
            <div className="flex justify-center items-center gap-5 mb-10">
              {
                avatars.map((avatar, index) => {
                  return (
                    <div
                      key={index}
                    >
                      <div
                        className={`border-2 p-2 rounded-full transition duration-500 ease-in-out ${selectedAvatar === index ? "border-[#4e0eff]" : ""}`}
                      >
                        <img
                          src={`data:image/svg+xml;base64, ${avatar}`}
                          alt="avatar"
                          onClick={() => setSelectedAvatar(index)}
                          className="h-20 w-20"
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <button
              className="bg-[#997af0] px-8 py-1 text-white rounded-md border-none uppercase hover:bg-[#4e0eff]"
              onClick={setProfilePicture}
            >
              Set as a profile picture
            </button>
          </div>
        )
      }

    </>
  )
}

export default SetAvatar