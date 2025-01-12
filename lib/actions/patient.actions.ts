import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    if (!userId) {
      console.error("No userId provided");
      return null;
    }
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const getPatient = async (userId: string) => {
  try {
    if (!userId) {
      console.error("No userId provided");
      return null;
    }
    const patients = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let uploadedFile;
    if (identificationDocument) {
      // Get the blob and filename from FormData
      const blob = identificationDocument.get("blobFile") as Blob;
      const fileName = identificationDocument.get("fileName") as string;

      // Create a file object that's compatible with your storage system
      const fileObject = new File([blob], fileName, { type: blob.type });

      // Upload to your storage
      uploadedFile = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        fileObject
      );
    }

    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: uploadedFile?.$id || null,
        identificationDocumentUrl: uploadedFile
          ? `${process.env.NEXT_PUBLIC_ENDPOINT!}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID!}/files/${
              uploadedFile.$id
            }/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID!}`
          : null,
        ...patient,
      }
    );

    return JSON.parse(JSON.stringify(newPatient));
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};
