export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  yearLevel: number;
}

export interface StudentQuery {
  firstName?: string;
  program?: string;
  yearLevel?: string;
  sortBy?: "firstName" | "lastName" | "email" | "program" | "yearLevel";
  order?: "asc" | "desc";
}