const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const Chat = sequelize.define("chats", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    descriptions: {
      type: Sequelize.TEXT,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    isOnline: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  Chat.associate = (models) => {
    Chat.hasMany(models.ChatMessage, { as: 'messages'});
    Chat.belongsTo(models.User, { as: 'to',foreignKey: 'to_user_id'});
    Chat.belongsTo(models.User, { as: 'from',foreignKey: 'from_user_id'});
  }

  Chat.beforeCreate(r => r.id = uuid())
  return Chat;
};