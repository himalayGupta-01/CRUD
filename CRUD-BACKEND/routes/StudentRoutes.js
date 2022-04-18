import express from "express";
import StudentController from "../controller/studentController.js";
import userController from "../controller/userController.js";
import auth from "../Middleware/auth.js";
const router=express.Router();

router.get("/getAll", auth, StudentController.getAllStudent);
router.post("/add", auth, StudentController.addStudent);
router.put("/edit/:id", auth, StudentController.editStudent);
router.get("/:id",auth, StudentController.getStudentById);
router.delete("/delete/:id", auth, StudentController.deleteStudent);


router.post("/registerUser",userController.addUser);
router.post("/loginUser",userController.getUserByEmail);
router.post("/logoutUser",userController.logout);

export default router;

