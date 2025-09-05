import { Sequelize, DataTypes, Model } from 'sequelize'

export interface UserModel extends Model {
	id: number
	name: string
	surname: string
	nickName: string
	email: string
	age: number
	role: 'USER' | 'ADMIN'
	password: string
}

export default (sequelize: Sequelize, modelName: string) => {
	const UserModelCtor = sequelize.define<UserModel>(
		modelName,
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			name: DataTypes.STRING,
			surname: DataTypes.STRING,
			nickName: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: { isEmail: true },
			},
			age: DataTypes.INTEGER,
			role: {
				type: DataTypes.ENUM('USER', 'ADMIN'),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		}, 
		{
			paranoid: true,
			timestamps: true,
			tableName: 'users'
		}
	)

	return UserModelCtor
}
