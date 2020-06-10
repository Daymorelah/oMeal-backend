module.exports = {
  up: queryInterface => queryInterface.bulkInsert('orders',[
    {
      id: '6426c0c1-0570-45a9-a2c6-69a766572429',
      meal: '[{"menuId":"567bbf5a-5ca6-418c-a03c-0f58ca6c6ae3","quantity":3,"price":1800,"name":"Jollof Rice and chicken"}]',
      drink: '[{"menuId":"9982a44b-0b63-4cc5-baa5-9ae8797deda2","quantity":1,"price":650,"name":"Hollandia Yoghurt"}]',
      address: 'No. 2 Adesanmi street, Ikoyi, Lagos',
      phoneNumber: '+2347032998441',
      orderType: 'home delivery',
      userId: '6ca8bdcc-17a9-4f3e-a5be-fcd6e285a978',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 'b9bdc5ad-fc9f-4d0d-86b5-40707dd649a0',
      meal: '[{"menuId":"6d213a10-bdde-40b5-92c6-1ffa980c933b","quantity":2,"price":800,"name":"Fruit juice"}]',
      drink: '[{"menuId":"4d20722d-f760-4cc2-8304-bc5f5c41ccec","quantity":2,"price":300,"name":"Table water"}]',
      address: 'No 4A, off admiralty way, Lekki phase 1',
      phoneNumber: '+2347039429184',
      orderType: 'pick-up',
      userId: '7aa865b0-b87d-4f80-88d8-28f50b11070b',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 'd25eb545-718c-415b-bf7a-1820acc44fe1',
      meal: '[{"menuId":"1446fda4-ac1f-4d33-be0c-07f4c6e68221","quantity":5,"price":1500,"name":"ICe Cream"}]',
      drink: '[{"menuId":"9982a44b-0b63-4cc5-baa5-9ae8797deda2","quantity":2,"price":1300,"name":"Hollandia Yoghurt"}]',
      address: 'No 12, Ishaga road, Surulere, Lagos',
      phoneNumber: '+2347033985721',
      orderType: 'home delivery',
      userId: '06f6e70e-7861-4d02-ab68-284abb2be87a',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 'dafc552a-6002-44af-ad6b-84ac38655ebd',
      meal: '[{"menuId":"567bbf5a-5ca6-418c-a03c-0f58ca6c6ae3","quantity":1,"price":600,"name":"Jollof Rice and chicken"}]',
      drink: '[{"menuId":"4d20722d-f760-4cc2-8304-bc5f5c41ccec","quantity":1,"price":150,"name":"Table water"}]',
      address: 'No 7A, admiralty way, Lekki phase 1',
      phoneNumber: '+2348139028741',
      orderType: 'pick-up',
      userId: '7aa865b0-b87d-4f80-88d8-28f50b11070b',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('orders', null, {})
};
