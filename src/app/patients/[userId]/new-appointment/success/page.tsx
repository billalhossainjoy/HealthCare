import { Button } from "@/components/ui/button";
import { Doctors } from "@/constant";
import { getAppointment } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    userId: string;
  };
  searchParams: {
    appointmentId: string;
  };
}

const Success: React.FC<Props> = async ({
  params: { userId },
  searchParams,
}) => {
  const appointmentId = searchParams?.appointmentId as string;
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%] justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full">
        <Link href={"/"}>
            <div className="font-semibold text-4xl my-5">
              Health<span className="text-green-500">Care</span>
            </div>
        </Link>
        <section className="flex flex-col justify-center items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="text-4xl font-sans mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be touch shortly to confirm.</p>
        </section>
        <section className="flex gap-6 border-y border-gray-800 py-8 my-10">
          <p>Requested appointment details: </p>
          <div className="flex gap-2">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p>{doctor?.name}</p>
          </div>
          <p>{new Date(appointment?.schedule).toLocaleString("en-us")}</p>
        </section>
        <Button variant="outline" className="rounded bg-green-500" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Success;
