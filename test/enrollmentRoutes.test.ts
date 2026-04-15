import request from "supertest";
import app from "../src/app";
import { clearStudents } from "../src/api/v1/services/studentServices";
import { clearCourses } from "../src/api/v1/services/courseServices";
import { clearEnrollments } from "../src/api/v1/services/enrollmentService";

describe("Enrollment API Endpoints", () => {
  const adminHeader = { Authorization: "Bearer admin-token" };
  const userHeader = { Authorization: "Bearer user-token" };

  beforeEach(() => {
    clearStudents();
    clearCourses();
    clearEnrollments();
  });

  it("should create an enrollment", async () => {
    // Arrange
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

    const enrollmentData = {
      studentId: studentResponse.body.data.id,
      courseId: courseResponse.body.data.id,
      status: "active",
    };

    // Act
    const response = await request(app)
      .post("/api/v1/enrollments")
      .set(adminHeader)
      .send(enrollmentData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Enrollment created successfully");
    expect(response.body.data.status).toBe("active");
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

    // Act
    const response = await request(app)
      .get(`/api/v1/enrollments/${enrollmentId}`)
      .set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(enrollmentId);
  });

  it("should delete an enrollment by id", async () => {
    // Arrange
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

    // Act
    const response = await request(app)
      .delete(`/api/v1/enrollments/${enrollmentId}`)
      .set(adminHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Enrollment deleted successfully");
  });
});