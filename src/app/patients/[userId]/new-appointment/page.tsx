import AppointmentForm from "@/components/form/AppointmentForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import PatientForm from "@/components/form/PatientForm";
import Image from "next/image";
import Link from "next/link";

const NewAppointment: React.FC<{ params: { userId: string } }> = async ({
  params: { userId },
}) => {
  const patient = await getPatient(userId);
  if (!patient) null;
  return (
    <div className="flex h-[100vh] remove-scrollbar overflow-hidden !important">
      <section className="overflow-y-scroll remove-scrollbar container overflow-hidden">
        <div>
          <div className="mx-auto flex-1 size-full flex-col py-10 max-w-[860px]">
            <div className="font-semibold text-4xl my-5">
              Health<span className="text-green-500">Care</span>
            </div>
            <AppointmentForm
              type="create"
              userId={userId}
              patientId={patient?.$id as string}
            />
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600">
                © 2024 CarePluse
              </p>
            </div>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="cover"
        height={1000}
        width={1000}
        className="side-img max-w-[50%] rounded-3xl"
      />
    </div>
  );
};
export default NewAppointment;
