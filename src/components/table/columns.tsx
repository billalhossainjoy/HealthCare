"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "../../../types/appwrite";
import StatusBadge from "../StatusBadge";
import { Doctors } from "@/constant";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p>{row.index+1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("schedule"));
      return date.toLocaleDateString();
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="inline-block ">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-2">
          <Image src={doctor?.image!} alt="image" width={32} height={32} />
          <p>{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type={"schedule"}
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Schedule Appointment"
            description="Please confirm the following details to sheduled"
          />
          <AppointmentModal
            type={"cancel"}
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Cancel Appointment"
            description="Are you sure you want to cancel."
          />
        </div>
      );
    },
  },
];
