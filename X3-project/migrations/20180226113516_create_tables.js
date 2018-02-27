exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',(table)=>{
    table.increments();
    table.string("name").notNullable();
    table.string("gender");
    table.string("facebookID");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
  .createTable('notes', (table)=>{
    table.increments();
    table.string("category");
    table.string("imagePath").notNullable();
    table.integer("image_x1").notNullable();
    table.integer("image_y1").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
  })
  .createTable("nodes", (table)=>{
    table.increments();
    table.integer("node_x1").notNullable();
    table.integer("node_y1").notNullable();
    table.integer("node_x2").notNullable();
    table.integer("node_y2").notNullable();
    table.string("node_content");
    table.integer("note_id").unsigned();
    table.foreign("note_id").references("notes.id");
  })
  .createTable("comments", (table)=>{
    table.increments();
    table.string("comment");
    table.integer("note_id").unsigned();
    table.foreign("note_id").references("notes.id");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
  })
};

exports.down = function(knex, Promise) {

};
