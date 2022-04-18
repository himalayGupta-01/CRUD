import db from "../models/base.js";
import sendMail from "../utilities/sendMail.js";
const Student = db.students;
import { addStudentSchema, updateStudentSchema } from "../validator/validateSchema.js"


class StudentController {

    static getAllStudent = async (req, res) => {
        try {
            const result = await Student.findAll({});
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
            res.status(404).json({ message: "Error Occured" });
        }
    }

    static addStudent = async (req, res) => {
        try {
            let newObj={"id":Math.floor(new Date().getTime() / 1000).toString(16), ...req.body}
            
            const validate = await addStudentSchema.validateAsync(req.body)

            const preRecord = await Student.findOne({ where: { email: req.body.email } });
            if (preRecord) {
                res.status(409).json({ message: "Student Already Registered With this Email Id" });
                return
            }

            const result = await Student.create(newObj);
            sendMail(req.body.email, "Registration Successfull", "Your Registration for the CRUD App is Successfull");
            
            res.status(201).json(result);
        }
        catch (err) {
            if (err.isJoi === true) {
                return res.status(422).json({ message: err.details[0].message });
            }
            console.log(err)
            res.status(403).json({ message: "Error Occured" });
        }
    }

    static editStudent = async (req, res) => {
        try {
            
            // delete req.body.id 
            // delete req.body.createdAt
            // delete req.body.updatedAt
            const validate = await updateStudentSchema.validateAsync(req.body)

            const result = await Student.update(req.body, { where: { id: req.params.id } });
            sendMail(req.body.email, "Details Updated Successfully", "Your request to update the details has been completed successfully ");
            res.status(201).json(result);
        }
        catch (err) {
            if (err.isJoi === true) {
                return res.status(422).json({ message: err.details[0].message });
            }
            console.log(err)
            res.status(409).json({ message: "Error Occured" });
        }
    }

    static getStudentById = async (req, res) => {
        try {
            const result = await Student.findOne({ where: { id: req.params.id } });
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
            res.status(404).json({ message: "Error Occured" });
        }
    }

    static deleteStudent = async (req, res) => {
        try {
            const result = await Student.destroy({ where: { id: req.params.id } });
            res.status(201).json(result);
        }
        catch (err) {
            console.log(err);
            res.status(409).json({ message: "Error Occured" });
        }
    }
}

export default StudentController