/// <reference types="jest" />

import request from "supertest";
import app from "../src/app";

describe("Health Endpoint", () => {
  it("should return API health status", async () => {
    // Arrange
    const endpoint = "/api/v1/health";

    // Act
    const response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("API is healthy");
  });
});