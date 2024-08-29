import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import AppointmentForm from "./form/AppointmentForm";
import { Appointment } from "../../types/appwrite";

interface Props {
  type: "schedule" | "cancel" | "create";
  patientId: string;
  userId: string;
  appointment?: Appointment;
  title: string;
  description: string;
}

const AppointmentModal: React.FC<Props> = ({ type,userId,patientId,appointment,title,description }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn("capitalize", {
            "text-green-500": type === "schedule",
            "text-red-500": type === "cancel",
          })}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"bg-dark-400 border-dark-500 !important sm:max-w-md"}
      >
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          type={type}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AppointmentModal;
