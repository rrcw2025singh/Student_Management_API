import { Router } from "express";
import {
  getStudentsHandler,
  getStudentByIdHandler,
  createStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
} from "../controllers/studentController";

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
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter students by first name
 *       - in: query
 *         name: program
 *         schema:
 *           type: string
 *         description: Filter students by program
 *       - in: query
 *         name: yearLevel
 *         schema:
 *           type: string
 *         description: Filter students by year level
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [firstName, lastName, email, program, yearLevel]
 *         description: Sort students by field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of students returned successfully
 */
router.get("/", getStudentsHandler);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found successfully
 *       404:
 *         description: Student not found
 */
router.get("/:id", getStudentByIdHandler);

/**
 * @swagger
 * /api/v1/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - program
 *               - yearLevel
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               program:
 *                 type: string
 *               yearLevel:
 *                 type: number
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid student data
 */
router.post("/", createStudentHandler);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               program:
 *                 type: string
 *               yearLevel:
 *                 type: number
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid update data
 *       404:
 *         description: Student not found
 */
router.put("/:id", updateStudentHandler);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:id", deleteStudentHandler);

export default router;