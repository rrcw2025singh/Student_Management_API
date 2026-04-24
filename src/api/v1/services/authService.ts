import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/jwt";

type Role = "admin" | "user";

interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
}

let users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
];

export const registerUser = async (
  email: string,
  password: string,
  role: Role
) => {
  const existingUser = users.find((user) => user.email === email);

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

  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = users.find((item) => item.email === email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
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



