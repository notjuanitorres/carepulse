import * as sdk from "node-appwrite";

const {
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT,
} = process.env;

const client = new sdk.Client();
client // Appwrite Client
  .setEndpoint("https://cloud.appwrite.io/v1") // API Endpoint
  .setProject(NEXT_PUBLIC_PROJECT_ID) // Project ID
  .setKey(
    "standard_811a6fb5e041f96044d3f3ead85a36f78a7746ef36c92a1a0555bcebd13f72deb1932a5c3dd1dddb7321c6b897903d1af1230ccb8a0a143b52d9ab18445db94ee12c38bd56f287327e3cabf75bb09d3e8eb788d804546c1cbce3371356019e5fe34d60a4180b98d594ec26ecb9aab6426c1d8e8ec86b8e64df7a33457f2283da"
  ); // API Key

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
