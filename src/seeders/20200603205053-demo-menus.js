module.exports = {
  up: queryInterface => queryInterface.bulkInsert('menus', [
    {
      id: '567bbf5a-5ca6-418c-a03c-0f58ca6c6ae3',
      name: 'Jollof Rice and chicken',
      prize: '600',
      category: 'Main dish',
      userId: '6ca8bdcc-17a9-4f3e-a5be-fcd6e285a978',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: '6d213a10-bdde-40b5-92c6-1ffa980c933b',
      name: 'Fruit juice',
      prize: '400',
      category: 'Appetizer',
      userId: '7aa865b0-b87d-4f80-88d8-28f50b11070b',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: '1446fda4-ac1f-4d33-be0c-07f4c6e68221',
      name: 'ICe Cream',
      prize: '300',
      category: 'Desert',
      userId: '06f6e70e-7861-4d02-ab68-284abb2be87a',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: '9982a44b-0b63-4cc5-baa5-9ae8797deda2',
      name: 'Hollandia Yoghurt',
      prize: '650',
      category: 'Drink',
      userId: '6ca8bdcc-17a9-4f3e-a5be-fcd6e285a978',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: '4d20722d-f760-4cc2-8304-bc5f5c41ccec',
      name: 'Table water',
      prize: '150',
      category: 'Drink',
      userId: '7aa865b0-b87d-4f80-88d8-28f50b11070b',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  ),

  down: queryInterface => queryInterface.bulkDelete('menus', null, {})
};
