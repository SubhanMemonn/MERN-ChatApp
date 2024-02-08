import Router from "express";
import { sendMessage, getMessage } from "../controllers/messsage.controller.js"
import JWTVerify from "../middlewares/auth.middleware.js";

const router = Router();
router.use(JWTVerify)

router.post("/:id", sendMessage)
router.get("/:id", getMessage)

export default router;