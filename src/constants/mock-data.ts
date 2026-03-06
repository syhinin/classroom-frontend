import { User, UserRole, Subject } from "../types";

export const MOCK_TEACHERS: User[] = [
  {
    id: "1",
    createdAt: "2026-03-06T09:00:00Z",
    updatedAt: "2026-03-06T09:00:00Z",
    email: "alice.johnson@university.edu",
    name: "Alice Johnson",
    role: UserRole.TEACHER,
    department: "Biology",
  },
  {
    id: "2",
    createdAt: "2026-03-06T09:00:00Z",
    updatedAt: "2026-03-06T09:00:00Z",
    email: "bob.smith@university.edu",
    name: "Bob Smith",
    role: UserRole.TEACHER,
    department: "Mathematics",
  },
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "An overview of fundamental computer science concepts, programming basics, and problem-solving techniques.",
    createdAt: "2026-02-18T09:00:00Z",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Linear Algebra",
    department: "Mathematics",
    description:
      "Study of vector spaces, linear transformations, matrices, and systems of linear equations.",
    createdAt: "2026-02-18T09:00:00Z",
  },
  {
    id: 3,
    code: "BIO150",
    name: "General Biology",
    department: "Biology",
    description:
      "Introduction to the principles of biology, including cell structure, genetics, evolution, and ecology.",
    createdAt: "2026-02-18T09:00:00Z",
  },
];
