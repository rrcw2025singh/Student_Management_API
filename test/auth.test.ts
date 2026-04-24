import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("should register a user", async () => {
    // Arrange
    const endpoint = "/api/v1/auth/register";
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "user",
    };

    // Act
    const response = await request(app).post(endpoint).send(userData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should login a user", async () => {
    // Arrange
    await request(app).post("/api/v1/auth/register").send({
      name: "Login User",
      email: "login@example.com",
      password: "password123",
      role: "user",
    });

    const endpoint = "/api/v1/auth/login";
    const loginData = {
      email: "login@example.com",
      password: "password123",
    };

    // Act
    const response = await request(app).post(endpoint).send(loginData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  it("should return 401 for invalid login", async () => {
    // Arrange
    const endpoint = "/api/v1/auth/login";
    const loginData = {
      email: "wrong@example.com",
      password: "wrongpassword",
    };

    // Act
    const response = await request(app).post(endpoint).send(loginData);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should return 400 for invalid register data", async () => {
    // Arrange
    const endpoint = "/api/v1/auth/register";
    const invalidUserData = {
      email: "invalid@example.com",
      password: "password123",
    };

    // Act
    const response = await request(app).post(endpoint).send(invalidUserData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});