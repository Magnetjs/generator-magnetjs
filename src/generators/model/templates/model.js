import Sequelize from 'sequelize'

export default function ({ sequelize }) {
  const Model = sequelize.define('<%= name %>', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
  })

  return Model
}
