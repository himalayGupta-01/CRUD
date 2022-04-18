import { studentModel } from "../database/db.js";
// import { userModel } from "../database/db2.js";
// import jwt from "jsonwebtoken";

class StudentController {
    static getAllStudent = async (req, res) => {
        try {
            const result = await studentModel.find();
            res.status(200).json(result);
        }
        catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static addStudent = async (req, res) => {
        try {

            const { firstName, lastName, age, email, address, mobile, fees } = req.body;
            if (!firstName || !lastName || !age || !email || !address || !mobile || !fees) {
                res.status(403).json("Please Fill all the Details");
                return;
            }

            const preRecord = await studentModel.findOne({ email: req.body.email });
            if (preRecord) {
                res.status(409).json("Student Already Registered With this Email Id");
                return
            }

            const doc = new studentModel(req.body);
            const result = await doc.save();
            res.status(201).json(result);
        }
        catch (err) {
            res.status(403).json({ message: err.message });
        }
    }

    static editStudent = async (req, res) => {
        try {

            const { firstName, lastName, age, email, address, mobile, fees } = req.body;
            if (!firstName || !lastName || !age || !email || !address || !mobile || !fees) {
                res.status(403).json("Please Fill all the Details");
                return;
            }

            const result = await studentModel.findByIdAndUpdate(req.params.id, new studentModel(req.body), { returnDocument: "after" });
            res.status(201).json(result);
        }
        catch (err) {
            console.log(err);
            res.status(409).json({ message: err.message });
        }
    }

    static getStudentById = async (req, res) => {
        try {
            const result = await studentModel.findById(req.params.id);
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
            res.status(404).json({ message: err.message });
        }
    }

    static deleteStudent = async (req, res) => {
        try {
            const result = await studentModel.findByIdAndDelete(req.params.id);
            res.status(201).json(result);
        }
        catch (err) {
            console.log(err);
            res.status(409).json({ message: err.message });
        }
    }
}

export default StudentController