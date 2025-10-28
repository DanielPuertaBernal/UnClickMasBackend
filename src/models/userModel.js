export default {
  async createUser(pool, { Name, Email, UserName, Password }) {
    const query = `
      INSERT INTO "Users" ("Name", "Email", "UserName", "Password")
      VALUES ($1, $2, $3, $4)
      RETURNING "Id", "Name", "Email", "UserName";
    `;
    const values = [Name, Email, UserName, Password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findByEmailOrUserName(pool, identifier) {
    const query = `
      SELECT * FROM "Users" WHERE "Email" = $1 OR "UserName" = $1;
    `;
    const { rows } = await pool.query(query, [identifier]);
    return rows[0];
  },

  async updatePoints(pool, userId, points) {
    const query = `
      UPDATE "Users"
      SET "TotalPoints" = "TotalPoints" + $1
      WHERE "Id" = $2
      RETURNING "UserName", "TotalPoints";
    `;
    const { rows } = await pool.query(query, [points, userId]);
    return rows[0];
  },

  async getLeaderboard(pool) {
    const query = `
      SELECT "UserName", "TotalPoints"
      FROM "Users"
      ORDER BY "TotalPoints" DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  },
};
