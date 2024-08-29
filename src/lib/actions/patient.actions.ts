"use server";

import { UserFormValidation } from "@/Schema/validation";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { z } from "zod";
import {
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";

export const createUser = async ({
  name,
  email,
  phone,
}: z.infer<typeof UserFormValidation>) => {
  try {
    console.log(name, email, phone);
    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        identificationDocumentId: file?.$id,
        ...patient,
        birthDate: String(patient.birthDate),
      }
    );

    return newPatient;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      // [Query.equal("userId", [userId])]
    );
    return patients.documents[0];
  } catch (error) {
    console.log(error);
  }
};




