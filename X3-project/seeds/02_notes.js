
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1,
          category: 'Language',
          imagePath: "/upload/Gordan/000001.jpg",
          image_x1: 200,
          image_y1: 200,
          created_at: new Date(98,1),
          user_id: 1
        },
        {
          id: 2,
          category: 'Food',
          imagePath: "/upload/Allen/000001.jpg",
          image_x1: 100,
          image_y1: 100,
          created_at: new Date(98,1),
          user_id: 2
        },
        {
          id: 3,
          category: 'Sex',
          imagePath: "/upload/Gordan/000002.jpg",
          image_x1: 10,
          image_y1: 10,
          created_at: new Date(98,1),
          user_id: 1
        },
      ]);
    });
};
