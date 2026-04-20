import bcrypt from "bcryptjs";
import { User } from "../models/authModel";
import { generateToken } from "../../../utils/jwt";

let users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: bcrypt.hashSync("user123", 10),
    role: "user",
  },
];

export const registerUser = async (
  email: string,
  password: string,
  role: "admin" | "user"
): Promise<User> => {
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    role,
  };

  users.push(newUser);
  return newUser;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; role: "admin" | "user" }> => {
  const user = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    role: user.role,
  };
};

export const resetUsers = (): void => {
  users = [
    {
      id: "1",
      email: "admin@example.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "admin",
    },
    {
      id: "2",
      email: "user@example.com",
      password: bcrypt.hashSync("user123", 10),
      role: "user",
    },
  ];
};