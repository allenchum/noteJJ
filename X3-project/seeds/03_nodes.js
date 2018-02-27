
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('nodes').del()
    .then(function () {
      // Inserts seed entries
      return knex('nodes').insert([
        {
          id: 1,
          node_x1: 30,
          node_y1: 30,
          node_x2: 100,
          node_y2: 100,
          node_content: "Apple Pie",
          note_id: 1
        },
        {
          id: 2,
          node_x1: 40,
          node_y1: 300,
          node_x2: 50,
          node_y2: 50,
          node_content: "Banana Pie",
          note_id: 1
        },
        {
          id: 3,
          node_x1: 50,
          node_y1: 30,
          node_x2: 300,
          node_y2: 200,
          node_content: "Fruit",
          note_id: 1
        },
        {
          id: 4,
          node_x1: 300,
          node_y1: 300,
          node_x2: 1000,
          node_y2: 1000,
          node_content: "Pineapple",
          note_id: 1
        },
        {
          id: 5,
          node_x1: 330,
          node_y1: 130,
          node_x2: 120,
          node_y2: 200,
          node_content: "Kiwi",
          note_id: 2
        },
        {
          id: 6,
          node_x1: 300,
          node_y1: 300,
          node_x2: 100,
          node_y2: 100,
          node_content: "Egg",
          note_id: 2
        },
        {
          id: 7,
          node_x1: 100,
          node_y1: 100,
          node_x2: 100,
          node_y2: 100,
          node_content: "this girl is hot and we want to fuck her",
          note_id: 2
        },
      ]);
    });
};
