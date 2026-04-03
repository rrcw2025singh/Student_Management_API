import request from "supertest";
import app from "../src/app";
import { clearStudents } from "../src/api/v1/services/studentServices";

describe("Student API Endpoints", () => {
  beforeEach(() => {
    clearStudents();
  });

  it("should create a student", async () => {
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
    const response = await request(app).post(endpoint).send(studentData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe("Karan");
    expect(response.body.lastName).toBe("Singh");
    expect(response.body.email).toBe("karan@example.com");
    expect(response.body.program).toBe("AD&D");
    expect(response.body.yearLevel).toBe(1);
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

    await request(app).post(endpoint).send(studentData);

    // Act
    const response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].firstName).toBe("Karan");
  });

  it("should get a student by id", async () => {
    // Arrange
    const createEndpoint = "/api/v1/students";
    const studentData = {
      firstName: "Karan",
      lastName: "Singh",
      email: "karan@example.com",
      program: "AD&D",
      yearLevel: 1,
    };

    const createResponse = await request(app).post(createEndpoint).send(studentData);
    const studentId = createResponse.body.id;

    // Act
    const response = await request(app).get(`/api/v1/students/${studentId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(studentId);
    expect(response.body.firstName).toBe("Karan");
  });

  it("should update a student by id", async () => {
    // Arrange
    const createEndpoint = "/api/v1/students";
    const studentData = {
      firstName: "Karan",
      lastName: "Singh",
      email: "karan@example.com",
      program: "AD&D",
      yearLevel: 1,
    };

    const updatedData = {
      program: "Software Development",
      yearLevel: 2,
    };

    const createResponse = await request(app).post(createEndpoint).send(studentData);
    const studentId = createResponse.body.id;

    // Act
    const response = await request(app)
      .put(`/api/v1/students/${studentId}`)
      .send(updatedData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.program).toBe("Software Development");
    expect(response.body.yearLevel).toBe(2);
  });

  it("should delete a student by id", async () => {
    // Arrange
    const createEndpoint = "/api/v1/students";
    const studentData = {
      firstName: "Karan",
      lastName: "Singh",
      email: "karan@example.com",
      program: "AD&D",
      yearLevel: 1,
    };

    const createResponse = await request(app).post(createEndpoint).send(studentData);
    const studentId = createResponse.body.id;

    // Act
    const response = await request(app).delete(`/api/v1/students/${studentId}`);

    // Assert
    expect(response.status).toBe(200);
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
    const response = await request(app).post(endpoint).send(invalidStudentData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("should return 404 for a non-existing student", async () => {
    // Arrange
    const studentId = "99999";

    // Act
    const response = await request(app).get(`/api/v1/students/${studentId}`);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Student not found");
  });
});