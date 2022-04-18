const Studentmodel = (sequelize, DataTypes) => {

    const Student = sequelize.define("student", {
        id: { type: DataTypes.STRING, primaryKey:true },
        firstName: { type: DataTypes.STRING, alowNull: false },
        lastName: { type: DataTypes.STRING, alowNull: false },
        age: { type: DataTypes.INTEGER, alowNull: false },
        email: { type: DataTypes.STRING, alowNull: false },
        address: { type: DataTypes.TEXT, alowNull: false },
        mobile: { type: DataTypes.STRING, alowNull: false },
        fees: { type: DataTypes.DECIMAL(10, 4), alowNull: false }
    })
    return Student;
}

export default Studentmodel