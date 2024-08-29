"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { Appointment } from "../../../types/appwrite";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    revalidatePath("/admin")
    return newAppointment;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return appointment;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initalCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") acc.scheduleCount++;
        else if (appointment.status === "pending") acc.pendingCount++;
        else if (appointment.status === "cancelled") acc.cancelledCount++;

        return acc;
      },
      initalCounts
    );
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return data;
  } catch (error) {}
};


export const updateAppointment = async ({ appointmentId, userId, appoinement, type }: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId, appoinement)
    if(!updatedAppointment) throw new Error("appoinment not found")
    // sms notification
    
    revalidatePath('/admin')
    return updatedAppointment;
  } catch (error) {
    console.log(error);
    
  }
  
}