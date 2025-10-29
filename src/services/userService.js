import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { pool } from "../config/db.js";

export const userService = {
  async register(data) {
    const existingEmail = await userModel.findByEmailOrUserName(pool, data.email);
    if (existingEmail) throw new Error("Email ya registrado");

    const existingUsername = await userModel.findByEmailOrUserName(pool, data.username);
    if (existingUsername) throw new Error("Nombre de usuario ya registrado");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return userModel.createUser(pool, { ...data, password: hashedPassword });
  },

  async login(identifier, password) {
    const user = await userModel.findByEmailOrUserName(pool, identifier);
    if (!user) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { userId: user.id, username: user.username, totalpoints: user.totalpoints },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    return { token, user: { id: user.id, username: user.username, totalpoints: user.totalpoints } };
  },

  async addPoints(userId, points) {
    return userModel.updatePoints(pool, userId, points);
  },

  async getLeaderboard() {
    return userModel.getLeaderboard(pool);
  },
};
