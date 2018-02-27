
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Gordan',
          gender: "M",
          facebookID: '540237231',
          created_at: new Date(98,1)
        },
        {
          id: 2,
          name: 'Allen',
          gender: "M",
          facebookID: '540237232',
          created_at: new Date(98,1)
        },
        {
          id: 3,
          name: 'Brian',
          gender: "M",
          facebookID: '540237233',
          created_at: new Date(98,1)
        }
      ]);
    });
};
