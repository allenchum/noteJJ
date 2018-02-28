
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Gordan Chung',
          gender: 'male',
          facebookID: '540237231',
          created_at: new Date(18,1),
          profilePicLink: 'https://twitter.com/harveydavisl/status/17468046068',
          firstName: 'Gordan'
        },
        {
          id: 2,
          name: 'Allen Chim',
          gender: "male",
          facebookID: '540237232',
          created_at: new Date(18,1),
          profilePicLink: 'https://www.memecenter.com/brom1',
          firstName: 'Allen'
        },
        {
          id: 3,
          name: 'Brian Chow',
          gender: "male",
          facebookID: '540237233',
          created_at: new Date(18,1),
          profilePicLink: 'https://www.istockphoto.com/photos/profile',
          firstName: 'Brian'
        }
      ]);
    });
};
