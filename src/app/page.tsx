import PatientForm from "@/components/form/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";



const Home: React.FC<SearchParamProps> = ({ searchParams }) => {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="container my-auto">
        <div>
          <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="healthcare"
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit"
            />
            <PatientForm />
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600">
                © 2024 CarePluse
              </p>
              <Link
                href="/?admin=true"
                className=" justify-items-end text-green-500"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="cover"
        height={1000}
        width={1000}
        className="side-img max-w-[50%] rounded-3xl"
      />
    </div>
  );
};
export default Home;
