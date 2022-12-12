const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")
const adminController = require("../Controllers/adminController")
const middleware = require('../middleware/auth')

//**************************user API's****************** */

// Create user// userLogin
router.post("/user", userController.createUser)
router.post("/user/login", userController.userLogin)
router.get("/user/:userId",middleware.authentication,userController.getuser)

//=======================admin api======================= */
router.post("/admin", adminController.createAdmin)
router.post("/admin/login", adminController.adminLogin)
router.get("/users/:userId",middleware.authentication,adminController.getUsers)
module.exports = router;