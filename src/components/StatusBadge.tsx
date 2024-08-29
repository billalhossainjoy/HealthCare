import { Doctors } from "@/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

const StatusBadge: React.FC<{
  status: "pending" | "scheduled" | "cancelled";
}> = ({ status }) => {
  return (
    <div
      className={cn("rounded-full flex items-center justify-center p-1 px-5 gap-2", {
        "bg-green-500/10": status === "pending",
        "bg-blue-500/10": status === "scheduled",
        "bg-red-600/20": status === "cancelled",
      })}
    >
      <Image src={StatusIcon[status]} alt="" width={18} height={18} />
      <p
        className={cn("text-md font-semibold", {
          "text-green-500": status === "pending",
          "text-blue-300": status === "scheduled",
          "text-red-300": status === "cancelled",
        })}
      >
        {status[0].toUpperCase() + status.slice(1)}
      </p>
    </div>
  );
};
export default StatusBadge;
