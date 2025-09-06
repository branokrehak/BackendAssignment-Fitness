import { Sequelize, DataTypes, Model } from 'sequelize'

export interface CompletedExerciseModel extends Model {
    id: number
    userId: number
    exerciseId: number
    completedAt: Date
    duration: number
}

export default (sequelize: Sequelize, modelName: string) => {
    const CompletedExercise = sequelize.define<CompletedExerciseModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            completedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            duration: {
                type: DataTypes.INTEGER, 
                allowNull: false,
            },
        },
        {
            tableName: 'completed_exercises',
            timestamps: true,
        }
    )

    CompletedExercise.associate = (models) => {
        CompletedExercise.belongsTo(models.User, { foreignKey: 'userId' })
        CompletedExercise.belongsTo(models.Exercise, { foreignKey: 'exerciseId' })
    }

    return CompletedExercise
}
