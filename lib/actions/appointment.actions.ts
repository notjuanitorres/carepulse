"use server";

import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { NEVER } from "zod";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      ID.unique(),
      appointment
    );

    return JSON.parse(JSON.stringify(newAppointment));
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      appointmentId,
    )

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};
