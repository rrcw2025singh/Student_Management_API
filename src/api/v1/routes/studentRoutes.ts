import { Router } from "express";
import {
  getStudentsHandler,
  getStudentByIdHandler,
  createStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
} from "../controllers/studentController";

const router = Router();

router.get("/", getStudentsHandler);
router.get("/:id", getStudentByIdHandler);
router.post("/", createStudentHandler);
router.put("/:id", updateStudentHandler);
router.delete("/:id", deleteStudentHandler);

export default router;