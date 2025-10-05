import { Router } from "express";
import {
  createReport,
  getUserReports,
  getMyReports,  
  updateReport,
  deleteReport,
  getAllReports,
  getDashboardReports, // ensure this is exported from controller
} from "../controller/report.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// If dashboard should be public, move verifyJWT off this route.
// Keeping all routes protected for now because router.use applies to all.
router.use(verifyJWT);

// Dashboard feed
router.get("/dashboard", getDashboardReports);

// Current user’s own reports (no param)
router.get("/me", getMyReports);

// Create and list all
router
  .route("/")
  .post(upload.single("file"), createReport) // expects field name "file"
  .get(getAllReports);

// Reports by user
router.get("/user/:userId", getUserReports);

// Update/delete by id
router
  .route("/:reportId")
  .put(updateReport)
  .delete(deleteReport);

export default router;
