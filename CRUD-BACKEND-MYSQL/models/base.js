import dbConfig from "../config/dbConfig.js";
import { Sequelize, DataTypes } from "sequelize";
import StudentModel from "./StudentModel.js";
import UserModel from "./UserModel.js";


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        logging: false    //to prevent sequelize to show SQL query in console
    })


    // Connecting to DB 
    sequelize.authenticate()
    .then(()=>{
        console.log("Connectred To DB");
    })
    .catch((error)=>{
        console.log("Cannot Connect to DB ERROR is: "+error);
    })

    //creating Object of Db to perform actions on it
    const db={}
    db.Sequelize=Sequelize
    db.sequelize=sequelize

    db.students=StudentModel(sequelize,DataTypes);
    db.users=UserModel(sequelize,DataTypes);

    // when connecting again dont create all the tables forcefully instead make changes in existing
    db.sequelize.sync({force:false})
    .then(()=>{
        console.log("Re-Sync Done");
    })

    export default db;

   