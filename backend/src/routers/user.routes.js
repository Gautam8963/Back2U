// src/routers/user.routes.js
import { Router } from "express";
import { changePassword, CurrentUser, loginUser, logout, registerUser, updateAccountDetails } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createReport, getDashboardReports } from "../controller/report.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { getAllReports } from "../controller/report.controller.js";
const router = Router();

// Prefer not to apply multer to all routes; see earlier note.
// router.use(upload.none());

router.post("/", verifyJWT, upload.single("file"), createReport);


router.route("/login").post(loginUser);
router.get("/dashboard", verifyJWT, getDashboardReports);

router.route("/register").post(registerUser);
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").get(verifyJWT, CurrentUser);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/update-details").post(verifyJWT, updateAccountDetails);
router.get("/dashboard", verifyJWT, getAllReports);


export default router;
