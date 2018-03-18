const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

class AddPhoto extends ParentFunction {
  constructor(contextReal) {
    super();
    this.contextReal = contextReal;
  }

  function getLatest() {
    const img = "";

    let query = knex.select("title", "imagePath").from("notes")
      .innerJoin("users", "user_id", "users.id")
      .where("facebookID", req.user.profile.id)
      .andWhere("created_at", MAX("created_at"));

    return query.then((rows) => {
      console.log(rows)
    })

  }

getLatest();
}

  //this.contextReal.drawImage(image, 100, 100, newImageWidth, newImageHeight);
