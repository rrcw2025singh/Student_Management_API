export const validateStudent = (data: any): string | null => {
  if (!data.firstName || typeof data.firstName !== "string") {
    return "First name is required and must be a string";
  }

  if (!data.lastName || typeof data.lastName !== "string") {
    return "Last name is required and must be a string";
  }

  if (!data.email || typeof data.email !== "string") {
    return "Email is required and must be a string";
  }

  if (!data.program || typeof data.program !== "string") {
    return "Program is required and must be a string";
  }

  if (data.yearLevel === undefined || typeof data.yearLevel !== "number") {
    return "Year level is required and must be a number";
  }

  return null;
};