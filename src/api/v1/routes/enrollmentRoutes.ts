import { Router } from "express";
import {
  createEnrollmentHandler,
  deleteEnrollmentHandler,
  getEnrollmentByIdHandler,
  getEnrollmentsHandler,
} from "../controllers/enrollmentController";
import { authenticate, authorizeAdmin } from "../../../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Enrollment management endpoints
 */
router.get("/", authenticate, getEnrollmentsHandler);
router.get("/:id", authenticate, getEnrollmentByIdHandler);
router.post("/", authenticate, authorizeAdmin, createEnrollmentHandler);
router.delete("/:id", authenticate, authorizeAdmin, deleteEnrollmentHandler);

export default router;