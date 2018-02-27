
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1,
          category: 'Language',
          imagePath: "/uploads/Gordan/000001.jpg",
          image_x1: 200,
          image_y1: 200,
          created_at: new Date(18,1),
          user_id: 1,
          title: 'Japanese101',
          description: 'learning Japanese is lots of fun'
        },
        {
          id: 2,
          category: 'Food',
          imagePath: "/uploads/Allen/000001.jpg",
          image_x1: 100,
          image_y1: 100,
          created_at: new Date(18,1),
          user_id: 2,
          title: 'Fruit',
          description: 'I love fruits'
        },
        {
          id: 3,
          category: 'Sex',
          imagePath: "/uploads/Gordan/000002.jpg",
          image_x1: 10,
          image_y1: 10,
          created_at: new Date(18,1),
          user_id: 1,
          title: 'Sex',
          description: 'biological study'
        },
      ]);
    });
};
