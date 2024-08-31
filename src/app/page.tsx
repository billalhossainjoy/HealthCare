import PatientForm from "@/components/form/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

const Home: React.FC<SearchParamProps> = ({ searchParams }) => {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="overflow-y-scroll remove-scrollbar container overflow-hidden ">
        <div className="p-16">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <div className="font-semibold text-4xl my-5">
              Health<span className="text-green-500">Care</span>
            </div>
            <PatientForm />
            {/* {login && <PatientLogin />} */}
            <p
              className="w-full text-center mt-3"
              // onClick={() => setLogin(!login)}
            >
              If already an account ?
              <span className="text-green-500">Sign in</span>
            </p>
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
