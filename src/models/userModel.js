export default {
  async createUser(pool, { name, email, username, password }) {
    const query = `
      insert into "users" ("name", "email", "username", "password")
      values ($1, $2, $3, $4)
      returning "id", "name", "email", "username";
    `;
    const values = [name, email, username, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findByEmailOrUserName(pool, identifier) {
    const query = `
      select * from "users" where "email" = $1 or "username" = $1;
    `;
    const { rows } = await pool.query(query, [identifier]);
    return rows[0];
  },

  async updatePoints(pool, userId, points) {
    const query = `
      update "users"
      set "totalpoints" = "totalpoints" + $1
      where "id" = $2
      returning "username", "totalpoints";
    `;
    const { rows } = await pool.query(query, [points, userId]);
    return rows[0];
  },

  async getLeaderboard(pool) {
    const query = `
      select "username", "totalpoints"
      from "users"
      order by "totalpoints" desc;
    `;
    const { rows } = await pool.query(query);
    return rows;
  },
};
