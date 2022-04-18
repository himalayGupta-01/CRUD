import mongoose from "mongoose";

const connectDB=()=>{
    mongoose.connect(process.env.URL,{dbName:"CRUD",useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log("Connected to DB")
    })
}
const studentSchema=mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true},
    address:{type:String, required:true},
    mobile:{type:Number, required:true},
    fees:{type:Number, required:true}
})
const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
})

const userModel=mongoose.model("user",userSchema);

const studentModel=mongoose.model("student",studentSchema);

export {connectDB,studentModel,userModel}