declare interface SearchParamProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
declare type Gender = "Male" | "Female" | "Other";

declare type Status = "pending" | "cancelled" | "scheduled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string | undefined | any;
  insurancePolicyNumber: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

declare interface CreateAppointmentParams {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
}

declare interface UpdateAppointmentParams {
  userId: string;
  appointmentId: string;
  appoinement: {
    primaryPhysician: string;
    schedule: Date;
    status: Status;
    cancellationReason: string;
  };
  type: "schedule" | "cancel" | "create";
}
