import request from "supertest";
import app from "../src/app";
import { clearCourses } from "../src/api/v1/services/courseServices";
import { getAdminToken, getUserToken } from "./helpers/authHelper";

describe("Course API Endpoints", () => {
  let adminHeader: { Authorization: string };
  let userHeader: { Authorization: string };

  beforeAll(async () => {
    const adminToken = await getAdminToken();
    const userToken = await getUserToken();

    adminHeader = { Authorization: `Bearer ${adminToken}` };
    userHeader = { Authorization: `Bearer ${userToken}` };
  });

  beforeEach(() => {
    clearCourses();
  });

  it("should create a course", async () => {
    const response = await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Backend Development");
  });

  it("should get all courses", async () => {
    await request(app)
      .post("/api/v1/courses")
      .set(adminHeader)
      .send({
        title: "Backend Development",
        description: "Node and Express course",
        code: "COMP3021",
      });

    const response = await request(app)
      .get("/api/v1/courses")
      .set(userHeader);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
  });
});