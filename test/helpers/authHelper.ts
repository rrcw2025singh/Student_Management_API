import request from "supertest";
import app from "../../src/app";

export const getAdminToken = async (): Promise<string> => {
  await request(app).post("/api/v1/auth/register").send({
    name: "Admin User",
    email: "admin@test.com",
    password: "password123",
    role: "admin",
  });

  const response = await request(app).post("/api/v1/auth/login").send({
    email: "admin@test.com",
    password: "password123",
  });

  return response.body.data.token;
};

export const getUserToken = async (): Promise<string> => {
  await request(app).post("/api/v1/auth/register").send({
    name: "Normal User",
    email: "user@test.com",
    password: "password123",
    role: "user",
  });

  const response = await request(app).post("/api/v1/auth/login").send({
    email: "user@test.com",
    password: "password123",
  });

  return response.body.data.token;
};