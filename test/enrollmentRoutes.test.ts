import request from "supertest";
import app from "../src/app";
import { clearStudents } from "../src/api/v1/services/studentServices";
import { clearCourses } from "../src/api/v1/services/courseServices";
import { clearEnrollments } from "../src/api/v1/services/enrollmentService";
import { getAdminToken, getUserToken } from "./helpers/authHelper";

describe("Enrollment API Endpoints", () => {
  let adminHeader: { Authorization: string };
  let userHeader: { Authorization: string };

  beforeAll(async () => {
    const adminToken = await getAdminToken();
    const userToken = await getUserToken();

    adminHeader = { Authorization: `Bearer ${adminToken}` };
    userHeader = { Authorization: `Bearer ${userToken}` };
  });

  beforeEach(async () => {
    await clearStudents();
    await clearCourses();
    await clearEnrollments();
  });

  it("should create an enrollment", async () => {
    const studentResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    const courseResponse = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    const response = await request(app)
      .post("/api/v1/enrollments")
      .set(adminHeader)
      .send({
        studentId: studentResponse.body.data.id,
        courseId: courseResponse.body.data.id,
        status: "active",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Enrollment created successfully");
  });

  it("should get all enrollments", async () => {
    const response = await request(app)
      .get("/api/v1/enrollments")
      .set(userHeader);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get an enrollment by id", async () => {
    const studentResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    const courseResponse = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    const createResponse = await request(app)
      .post("/api/v1/enrollments")
      .set(adminHeader)
      .send({
        studentId: studentResponse.body.data.id,
        courseId: courseResponse.body.data.id,
        status: "active",
      });

    const enrollmentId = createResponse.body.data.id;

    const response = await request(app)
      .get(`/api/v1/enrollments/${enrollmentId}`)
      .set(userHeader);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(enrollmentId);
  });

  it("should delete an enrollment by id", async () => {
    const studentResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    const courseResponse = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    const createResponse = await request(app)
      .post("/api/v1/enrollments")
      .set(adminHeader)
      .send({
        studentId: studentResponse.body.data.id,
        courseId: courseResponse.body.data.id,
        status: "active",
      });

    const enrollmentId = createResponse.body.data.id;

    const response = await request(app)
      .delete(`/api/v1/enrollments/${enrollmentId}`)
      .set(adminHeader);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Enrollment deleted successfully");
  });
});