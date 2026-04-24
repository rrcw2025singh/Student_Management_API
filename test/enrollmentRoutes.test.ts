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
    await clearEnrollments();
    await clearStudents();
    await clearCourses();
  });

  const createStudentAndCourse = async () => {
    const unique = Date.now();

    const studentResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: `karan-${unique}@example.com`,
        program: "AD&D",
        yearLevel: 1,
      });

    const courseResponse = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: `COMP${unique}`,
      });

    return {
      studentId: studentResponse.body.data.id,
      courseId: courseResponse.body.data.id,
    };
  };

  it("should create an enrollment", async () => {
    // Arrange
    const { studentId, courseId } = await createStudentAndCourse();
    const endpoint = "/api/v1/enrollments";
    const enrollmentData = {
      studentId,
      courseId,
      status: "active",
    };

    // Act
    const response = await request(app)
      .post(endpoint)
      .set(adminHeader)
      .send(enrollmentData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Enrollment created successfully");
  });

  it("should get all enrollments", async () => {
    // Arrange
    const endpoint = "/api/v1/enrollments";

    // Act
    const response = await request(app).get(endpoint).set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get an enrollment by id", async () => {
    // Arrange
    const { studentId, courseId } = await createStudentAndCourse();

    const createResponse = await request(app)
      .post("/api/v1/enrollments")
      .set(adminHeader)
      .send({
        studentId,
        courseId,
        status: "active",
      });

    const enrollmentId = createResponse.body.data.id;
    const endpoint = `/api/v1/enrollments/${enrollmentId}`;

    // Act
    const response = await request(app).get(endpoint).set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(enrollmentId);
  });

  it("should delete an enrollment by id", async () => {
    // Arrange
    const { studentId, courseId } = await createStudentAndCourse();

    const createResponse = await request(app)
      .post("/api/v1/enrollments")
      .set(adminHeader)
      .send({
        studentId,
        courseId,
        status: "active",
      });

    const enrollmentId = createResponse.body.data.id;
    const endpoint = `/api/v1/enrollments/${enrollmentId}`;

    // Act
    const response = await request(app).delete(endpoint).set(adminHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Enrollment deleted successfully");
  });
});