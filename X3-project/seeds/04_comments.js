
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          id: 1,
          comment: 'Nice and I love it.',
          note_id: 1,
          user_id: 3
        },
        {
          id: 2,
          comment: 'There is a typo in the note',
          note_id: 2,
          user_id: 3
        },
        {
          id: 3,
          comment: 'This is what I am looking for.',
          note_id: 3,
          user_id: 3
        }
      ]);
    });
};
