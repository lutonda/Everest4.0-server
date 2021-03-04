const { UUID, UUIDV4 } = require('sequelize/types');
const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const CoachingSubscribe = sequelize.define('coaching_subscribe', {
        id:{
            primaryKey: true,
            type: UUID,
            default: UUIDV4
        },
        description:{
            type: Sequelize.STRING
        },
        isActive:{
            type:Sequelize.BOLEAN,
            default: true
        },
        //Timestamp
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        indexes:[{
            fields:['id', 'userId']
        }]
    });

    CoachingSubscribe.associate = (models) =>{

        CoachingSubscribe.hasOne(models.CoachingGoal);
        CoachingSubscribe.hasOne(models.CoachingDuration);

        CoachingSubscribe.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
    }

    CoachingSubscribe.beforeCreate(coachingSubscribe => coachingSubscribe.id = uuid());
    
    return CoachingSubscribe;
}