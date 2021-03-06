const {
    v4: uuid
} = require('uuid');

module.exports = ({
    sequelize,
    Sequelize
}) => {

    const Quiz = sequelize.define("quizes", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        text: {
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        indexes: [{
            fields: ['id', 'userId']
        }]
    });

    Quiz.associate = (models) => {
        Quiz.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
        Quiz.hasMany(models.Answer, {
            as: 'answers',
            foreignKey: 'quizId'
        })
    }

    Quiz.beforeCreate(quiz => quiz.id = uuid())

    return Quiz;
};