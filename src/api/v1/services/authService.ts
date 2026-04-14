import { User } from "../models/authModel";

let users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

export const registerUser = (
  email: string,
  password: string,
  role: "admin" | "user"
): User => {
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    role,
  };

  users.push(newUser);
  return newUser;
};

export const loginUser = (
  email: string,
  password: string
): { token: string; role: "admin" | "user" } => {
  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    token: user.role === "admin" ? "admin-token" : "user-token",
    role: user.role,
  };
};

export const resetUsers = (): void => {
  users = [
    {
      id: "1",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: "2",
      email: "user@example.com",
      password: "user123",
      role: "user",
    },
  ];
};