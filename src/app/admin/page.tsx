import { DataTable } from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";

const Admin: React.FC = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className=" sticky top-3 z-20 mx-3 justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg xl:px-12 flex">
        <Link href="/">
            <div className="font-semibold text-xl ">
              Health<span className="text-green-500">Care</span>
            </div>
        </Link>
        <p className="text-16 font-semibold cursor-default">Admin Dashboard</p>
      </header>
      <main className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin</h1>
          <p className="text-dark-700">
            Start the day managing new appointments
          </p>
        </section>
        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
          <StatCard
            type="appointments"
            count={appointments?.scheduleCount!}
            label="Scheduled appointment"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount!}
            label="Pending appointment"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount!}
            label="Cancelled appointment"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments?.documents!} />
      </main>
    </div>
  );
};
export default Admin;
