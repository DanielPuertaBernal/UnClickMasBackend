import { userService } from "../services/userService.js";

export const userController = {
  async register(req, res) {
    try {
      const result = await userService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { identifier, password } = req.body;
      const result = await userService.login(identifier, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  async addPoints(req, res) {

    if (typeof req.body.points !== "number" || req.body.points <= 0) {
        return res.status(400).json({ message: "Puntos inválidos" });
    }

    try {
        const { points } = req.body;
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });

        const result = await userService.addPoints(userId, points);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  },

  async leaderboard(req, res) {
    try {
      const result = await userService.getLeaderboard();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
