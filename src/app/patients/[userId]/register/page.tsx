import RegisterForm from "@/components/form/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

const Home: React.FC<{ params: { userId: string } }> = async ({ params }) => {
  const user = await getUser(params.userId);
  const patient = await getPatient(params.userId);
  // console.log(patient);
  // if (patient && patient.$id)
  //   redirect(`/patients/${params.userId}/new-appointment`);

  if (!user) return;

  return (
    <div className="flex h-screen remove-scrollbar">
      <section className="overflow-y-scroll remove-scrollbar container overflow-hidden">
        <div>
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="healthcare"
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit"
            />
            <RegisterForm user={user} />
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
export default Home;
