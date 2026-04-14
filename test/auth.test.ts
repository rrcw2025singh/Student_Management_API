import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("should login admin successfully", async () => {
    // Arrange
    const endpoint = "/api/v1/auth/login";
    const loginData = {
      email: "admin@example.com",
      password: "admin123",
    };

    // Act
    const response = await request(app).post(endpoint).send(loginData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.data.token).toBe("admin-token");
    expect(response.body.data.role).toBe("admin");
  });

  it("should fail login with invalid credentials", async () => {
    // Arrange
    const endpoint = "/api/v1/auth/login";
    const loginData = {
      email: "wrong@example.com",
      password: "wrong123",
    };

    // Act
    const response = await request(app).post(endpoint).send(loginData);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should register a new user successfully", async () => {
    // Arrange
    const endpoint = "/api/v1/auth/register";
    const registerData = {
      email: "newuser@example.com",
      password: "pass1234",
      role: "user",
    };

    // Act
    const response = await request(app).post(endpoint).send(registerData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body.data.email).toBe("newuser@example.com");
    expect(response.body.data.role).toBe("user");
  });

  it("should return 400 for invalid register data", async () => {
    // Arrange
    const endpoint = "/api/v1/auth/register";
    const registerData = {
      email: "bademail",
      password: "123",
      role: "user",
    };

    // Act
    const response = await request(app).post(endpoint).send(registerData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});