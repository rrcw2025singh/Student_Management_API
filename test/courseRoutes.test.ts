import request from "supertest";
import app from "../src/app";
import { clearCourses } from "../src/api/v1/services/courseService";

describe("Course API Endpoints", () => {
  const adminHeader = { Authorization: "Bearer admin-token" };
  const userHeader = { Authorization: "Bearer user-token" };

  beforeEach(() => {
    clearCourses();
  });

  it("should create a course", async () => {
    // Arrange
    const endpoint = "/api/v1/courses";
    const courseData = {
      title: "Backend Development",
      description: "Node and Express course",
      code: "COMP3021",
    };

    // Act
    const response = await request(app)
      .post(endpoint)
      .set(adminHeader)
      .send(courseData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Course created successfully");
    expect(response.body.data.title).toBe("Backend Development");
  });

  it("should get all courses", async () => {
    // Arrange
    await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    // Act
    const response = await request(app)
      .get("/api/v1/courses")
      .set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
  });

  it("should get a course by id", async () => {
    // Arrange
    const createResponse = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    const courseId = createResponse.body.data.id;

    // Act
    const response = await request(app)
      .get(`/api/v1/courses/${courseId}`)
      .set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(courseId);
  });

  it("should update a course by id", async () => {
    // Arrange
    const createResponse = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    const courseId = createResponse.body.data.id;
    const updatedData = {
      title: "Advanced Backend Development",
    };

    // Act
    const response = await request(app)
      .put(`/api/v1/courses/${courseId}`)
      .set(adminHeader)
      .send(updatedData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Advanced Backend Development");
  });

  it("should delete a course by id", async () => {
    // Arrange
    const createResponse = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    const courseId = createResponse.body.data.id;

    // Act
    const response = await request(app)
      .delete(`/api/v1/courses/${courseId}`)
      .set(adminHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Course deleted successfully");
  });
});