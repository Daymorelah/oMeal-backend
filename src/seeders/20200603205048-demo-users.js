import bcrypt from 'bcrypt'

const init = async () => {
  const password = bcrypt.hashSync('password', bcrypt.genSaltSync(8))
  return password
}

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('users', [
    {
      id: '6ca8bdcc-17a9-4f3e-a5be-fcd6e285a978',
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo1@demo.com',
      username: 'user1',
      phone: '+234803915428',
      password: await init(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '7aa865b0-b87d-4f80-88d8-28f50b11070b',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'demo2@demo.com',
      username: 'user2',
      phone: '+234805148392',
      password: await init(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '06f6e70e-7861-4d02-ab68-284abb2be87a',
      firstName: 'Max',
      lastName: 'Smith',
      email: 'demo3@demo.com',
      username: 'user3',
      phone: '+2348025473132',
      password: await init(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
}