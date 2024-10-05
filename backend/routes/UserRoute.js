import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";

const api = express.Router();

api.get("/api/v1/users", getUsers);
api.get("/api/v1/users/:id", getUserById);
api.post("/api/v1/users", createUser);
api.patch("/api/v1/users/:id", updateUser);
api.delete("/api/v1/users/:id", deleteUser);

export default api;
