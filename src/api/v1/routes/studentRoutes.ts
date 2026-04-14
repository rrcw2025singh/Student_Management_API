import { Router } from "express";
import {
  getStudentsHandler,
  getStudentByIdHandler,
  createStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
} from "../controllers/studentController";
import { authenticate, authorizeAdmin } from "../../../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management endpoints
 */

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *       - in: query
 *         name: program
 *         schema:
 *           type: string
 *       - in: query
 *         name: yearLevel
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [firstName, lastName, email, program, yearLevel]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Students returned successfully
 */
router.get("/", authenticate, getStudentsHandler);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authenticate, getStudentByIdHandler);

/**
 * @swagger
 * /api/v1/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorizeAdmin, createStudentHandler);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, authorizeAdmin, updateStudentHandler);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorizeAdmin, deleteStudentHandler);

export default router;