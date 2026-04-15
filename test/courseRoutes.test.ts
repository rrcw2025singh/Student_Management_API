import request from "supertest";
import app from "../src/app";
import { clearCourses } from "../src/api/v1/services/courseServices";

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

});