const User = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck) {
      return res.json({ message: "Username already used", status: false })
    }
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({ message: "Email already used", status: false })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username, email, password: hashedPassword
    })
    delete user.password
    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}