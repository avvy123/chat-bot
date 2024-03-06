const { addMessage, getAllMessage } = require("../controllers/messageController")

const router = require("express").Router()

router.post("/addMessage/", addMessage)
router.post("/getMessage/", getAllMessage)

module.exports = router