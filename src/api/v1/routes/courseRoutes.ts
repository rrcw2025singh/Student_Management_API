import { Router } from "express";
import {
  createCourseHandler,
  deleteCourseHandler,
  getCourseByIdHandler,
  getCoursesHandler,
  updateCourseHandler,
} from "../controllers/courseController";
import { authenticate, authorizeAdmin } from "../../../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management endpoints
 */
router.get("/", authenticate, getCoursesHandler);
router.get("/:id", authenticate, getCourseByIdHandler);
router.post("/", authenticate, authorizeAdmin, createCourseHandler);
router.put("/:id", authenticate, authorizeAdmin, updateCourseHandler);
router.delete("/:id", authenticate, authorizeAdmin, deleteCourseHandler);

export default router;