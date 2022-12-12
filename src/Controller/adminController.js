const adminModel = require("../models/adminModel")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


//=======create admin=========
const createAdmin = async function (req, res) {
    try {

        let data = req.body
        const newAdmin = await adminModel.create(data);
        res.status(201).send({ status: true, message: "Admin created successfully", data: newAdmin });


    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}


//=========adminLogin=========
const adminLogin = async function (req, res) {
    try {

        const requestBody = req.body;
        const userName = requestBody.email;
        const password = requestBody.password;


        const admin = await adminModel.findOne({
            email: userName,
            password: password
        });

        if (!admin) {
            return res.status(404).send({ status: false, message: "email or password is wrong" })
        }
        //creating a jsonWebToken and sending it to responce header and body

        let token = jwt.sign({
            adminId: admin._id.toString()
        },
            "project_Appening"
        );

        res.header("x-api-key", token);


        res.status(200).send({ status: true, message: "admin Login Successfully", data: token })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const getUsers = async function (req, res) {
    try {
      
      const data = await userModel.find()

      if(data.length==0){
        return res.status(404).send({ status: false, message: "no data found " })
      }

      res.status(200).send({ status: true, data: data})


    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}




module.exports = { createAdmin, adminLogin, getUsers }