"use server";

import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      "677ff4ca0023b459fcfd",
      "677ff521000017d7cfd6",
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
      "677ff4ca0023b459fcfd",
      "677ff521000017d7cfd6",
      appointmentId,
    )

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};
