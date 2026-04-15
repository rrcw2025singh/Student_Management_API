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


router.get("/", authenticate, getStudentsHandler);


router.get("/:id", authenticate, getStudentByIdHandler);


router.post("/", authenticate, authorizeAdmin, createStudentHandler);


router.put("/:id", authenticate, authorizeAdmin, updateStudentHandler);


router.delete("/:id", authenticate, authorizeAdmin, deleteStudentHandler);

export default router;