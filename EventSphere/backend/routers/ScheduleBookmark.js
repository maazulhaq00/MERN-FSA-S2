



import express from "express";
import { getallBookmarks, getUserBookmarks, toggleBookmark } from "../controllers/ScheduleBookmarkController.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

router.get("/", Auth, getUserBookmarks);
router.get("/all", getallBookmarks);
router.post("/", Auth, toggleBookmark);

export default router;

