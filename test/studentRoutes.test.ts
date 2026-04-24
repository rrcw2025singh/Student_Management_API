import request from "supertest";
import app from "../src/app";
import { getAdminToken, getUserToken } from "./helpers/authHelper";
import { clearStudents } from "../src/api/v1/services/studentServices";

describe("Student API Endpoints", () => {
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
  });

  it("should create a student as admin", async () => {
    // Arrange
    const endpoint = "/api/v1/students";
    const studentData = {
      firstName: "Karan",
      lastName: "Singh",
      email: "karan@example.com",
      program: "AD&D",
      yearLevel: 1,
    };

    // Act
    const response = await request(app)
      .post(endpoint)
      .set(adminHeader)
      .send(studentData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Student created successfully");
    expect(response.body.data.firstName).toBe("Karan");
    expect(response.body.data.email).toBe("karan@example.com");
  });

  it("should not create a student as normal user", async () => {
    // Arrange
    const endpoint = "/api/v1/students";
    const studentData = {
      firstName: "Karan",
      lastName: "Singh",
      email: "karan@example.com",
      program: "AD&D",
      yearLevel: 1,
    };

    // Act
    const response = await request(app)
      .post(endpoint)
      .set(userHeader)
      .send(studentData);

    // Assert
    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Forbidden. Admin access only.");
  });

  it("should get all students", async () => {
    // Arrange
    const endpoint = "/api/v1/students";
    const studentData = {
      firstName: "Karan",
      lastName: "Singh",
      email: "karan@example.com",
      program: "AD&D",
      yearLevel: 1,
    };

    await request(app).post(endpoint).set(adminHeader).send(studentData);

    // Act
    const response = await request(app).get(endpoint).set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Students retrieved successfully");

    const karanStudents = response.body.data.filter(
      (student: any) => student.email === "karan@example.com"
    );

    expect(karanStudents.length).toBe(1);
    expect(karanStudents[0].firstName).toBe("Karan");
  });

  it("should get a student by id", async () => {
    // Arrange
    const createResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    const studentId = createResponse.body.data.id;

    // Act
    const response = await request(app)
      .get(`/api/v1/students/${studentId}`)
      .set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(studentId);
    expect(response.body.data.firstName).toBe("Karan");
  });

  it("should update a student by id as admin", async () => {
    // Arrange
    const createResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    const studentId = createResponse.body.data.id;
    const updatedData = {
      program: "Software Development",
      yearLevel: 2,
    };

    // Act
    const response = await request(app)
      .put(`/api/v1/students/${studentId}`)
      .set(adminHeader)
      .send(updatedData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Student updated successfully");
    expect(response.body.data.program).toBe("Software Development");
    expect(response.body.data.yearLevel).toBe(2);
  });

  it("should return 400 for invalid update data", async () => {
    // Arrange
    const createResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    const studentId = createResponse.body.data.id;

    // Act
    const response = await request(app)
      .put(`/api/v1/students/${studentId}`)
      .set(adminHeader)
      .send({ yearLevel: "second" });

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should delete a student by id as admin", async () => {
    // Arrange
    const createResponse = await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    const studentId = createResponse.body.data.id;

    // Act
    const response = await request(app)
      .delete(`/api/v1/students/${studentId}`)
      .set(adminHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Student deleted successfully");
  });

  it("should return 400 for invalid student data", async () => {
    // Arrange
    const endpoint = "/api/v1/students";
    const invalidStudentData = {
      firstName: "Karan",
      email: "karan@example.com",
    };

    // Act
    const response = await request(app)
      .post(endpoint)
      .set(adminHeader)
      .send(invalidStudentData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return 404 for a non-existing student", async () => {
    // Arrange
    const studentId = "99999";

    // Act
    const response = await request(app)
      .get(`/api/v1/students/${studentId}`)
      .set(userHeader);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Student not found");
  });

  it("should filter students by program", async () => {
    // Arrange
    await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Karan",
        lastName: "Singh",
        email: "karan@example.com",
        program: "AD&D",
        yearLevel: 1,
      });

    await request(app)
      .post("/api/v1/students")
      .set(adminHeader)
      .send({
        firstName: "Aman",
        lastName: "Brar",
        email: "aman@example.com",
        program: "BIT",
        yearLevel: 2,
      });

    // Act
    const response = await request(app)
      .get("/api/v1/students?program=AD&D")
      .set(userHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].program).toBe("AD&D");
  });

  it("should return 401 without token", async () => {
    // Arrange
    const endpoint = "/api/v1/students";

    // Act
    const response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized. Token missing.");
  });
});