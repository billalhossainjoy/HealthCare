"use client";

import { getAppointmentSchema } from "@/Schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomForm from "./../CustomForm";
import { useRouter } from "next/navigation";
import { Doctors, FormFieldType } from "@/constant";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.action";
import { Appointment } from "../../../types/appwrite";

interface Props {
  userId: string;
  type: "create" | "cancel" | "schedule";
  patientId: string;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}

const AppointmentForm: React.FC<Props> = ({
  userId,
  type,
  patientId,
  appointment,
  setOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician ?? "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
      reason: appointment?.reason ?? "",
      notes: appointment?.reason ?? "",
      cancellationReason: "",
    },
  });
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: values.schedule,
          reason: values.reason,
          note: values.notes,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appoinementToUpdate = {
          userId,
          appointmentId: appointment?.$id as string,
          appoinement: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason as string,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appoinementToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      return;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-12"
        >
          {type === "create" && (
            <section className="mb-12 space-y-4">
              <h1 className="header text-white">Hi there 👋</h1>
              <p className="text-dark-700">Schedule your first appointment</p>
            </section>
          )}

          {type !== "cancel" && (
            <>
              <CustomForm
                name="primaryPhysician"
                control={form.control}
                fieldType={FormFieldType.SELECT}
                label="Doctor"
                placeholder="Select a doctor"
              >
                {Doctors.map((doctor, i) => (
                  <SelectItem
                    key={i}
                    value={doctor.name}
                    className="hover:outline-none focus:outline-none m-3"
                  >
                    <div className="flex cursor-pointer intems-center gap-2 !important">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={32}
                        height={32}
                        className="rounded-full border border-dark-500"
                      />
                      <p className="flex items-center">{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomForm>
              <CustomForm
                fieldType={FormFieldType.DATE_PICKER}
                name="schedule"
                control={form.control}
                showTimeSelect={true}
                label="Expected appointment date"
                dateFormat="MM/dd/yyyy - h:mm aa"
              />
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="Enter reason for appoinment"
                />
                <CustomForm
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="notes"
                  label="Notes"
                  placeholder="Enter Notes"
                />
              </div>
            </>
          )}
          {type === "cancel" && (
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for cancellation"
              placeholder="Enter reason for cancellation"
            />
          )}

          <SubmitButton
            isLoading={isLoading}
            className={cn({ "bg-red-500": type === "cancel" })}
          >
            {buttonLabel}
          </SubmitButton>
        </form>
      </Form>
    </>
  );
};
export default AppointmentForm;
