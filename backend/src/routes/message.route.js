import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getsidebarusers, getmessages, sendmessage } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/", protectRoute, getsidebarusers);

router.get("/:id", protectRoute, getmessages)

router.post("/:id", protectRoute, sendmessage)

export default router