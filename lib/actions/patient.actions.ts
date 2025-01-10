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
      "677ff4ca0023b459fcfd",
      "677ff4ec003144f44727",
      [Query.equal("userId", [userId])]
    );
    console.log("patients", patients);
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
        "677ff617003b2165c0ab",
        ID.unique(),
        fileObject
      );
    }

    const newPatient = await databases.createDocument(
      "677ff4ca0023b459fcfd",
      "677ff4ec003144f44727",
      ID.unique(),
      {
        identificationDocumentId: uploadedFile?.$id || null,
        identificationDocumentUrl: uploadedFile
          ? `${"https://cloud.appwrite.io/v1"}/storage/buckets/677ff617003b2165c0ab/files/${
              uploadedFile.$id
            }/view?project=677ff43800113411eff7`
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
