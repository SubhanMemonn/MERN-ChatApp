import Router from "express";
import { getUsersForSidebar, login, logout, signup } from "../controllers/user.controller.js";
import JWTVerify from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

//secure route
router.get("/", JWTVerify, getUsersForSidebar)


export default router;