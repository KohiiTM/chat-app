import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
  deleteMessage,
  markMessagesAsRead,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

router.delete("/:messageId", protectRoute, deleteMessage);

router.post("/read/:userId", protectRoute, markMessagesAsRead);

export default router;
