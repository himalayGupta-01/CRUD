const UserModel = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        id: { type: DataTypes.STRING, primaryKey:true  },
        name: { type:DataTypes.STRING, allowNull:false },
        email: { type:DataTypes.STRING, allowNull:false},
        password: { type:DataTypes.STRING, allowNull:false },
    })
    return User;
}
export default UserModel;