const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

//======create employee===============

const createUser = async function (req, res) {
    try {
        let requestBody = req.body
        const newUser = await userModel.create(requestBody);
        res.status(201).send({ status: true, message: "user registered successfully", data: newUser });

    } catch (err) {
        res.status(500).send({ err: err.message })

    }
}

//==========login user============

const userLogin = async function (req, res) {
    try {

        const requestBody = req.body;
        const userName = requestBody.email;
        const password = requestBody.password;


        const user = await userModel.findOne({
            email: userName,
            password: password
        });

        if (!user) {
            return res.status(404).send({ status: false, message: "no user found " })
        }
        //creating a jsonWebToken and sending it to responce header and body

        let token = jwt.sign({
            userId: user._id.toString()
        },
            "project_Appening"
        );

        res.header("x-api-key", token);


        res.status(200).send({ status: true, message: "Usser Login Successfully", data: token })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

//======get user ========
const getuser = async function (req, res) {
    try {
      const userId = req.params.userId

      const data = await userModel.findById(userId)

      if(data.length==0){
        return res.status(404).send({ status: false, message: "no data found " })
      }

      res.status(200).send({ status: true, data: data})


    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = { createUser, userLogin, getuser }