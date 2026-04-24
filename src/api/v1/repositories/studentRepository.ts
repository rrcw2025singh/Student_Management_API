import { db } from "../../../config/firebase";
import { Student } from "../models/studentModel";

const studentCollection = db.collection("students");

export const findAllStudents = async (): Promise<Student[]> => {
  const snapshot = await studentCollection.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Student[];
};

export const findStudentById = async (
  id: string
): Promise<Student | undefined> => {
  const doc = await studentCollection.doc(id).get();

  if (!doc.exists) {
    return undefined;
  }

  return {
    id: doc.id,
    ...doc.data(),
  } as Student;
};

export const addStudent = async (
  student: Omit<Student, "id">
): Promise<Student> => {
  const docRef = await studentCollection.add(student);

  return {
    id: docRef.id,
    ...student,
  };
};

export const updateStudentById = async (
  id: string,
  updatedData: Partial<Student>
): Promise<Student | null> => {
  const docRef = studentCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  await docRef.update(updatedData);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  } as Student;
};

export const removeStudent = async (id: string): Promise<boolean> => {
  const docRef = studentCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};

export const resetStudents = async (): Promise<void> => {
  const snapshot = await studentCollection.get();

  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};