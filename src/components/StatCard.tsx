import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}

const StatCard: React.FC<Props> = ({ type, count, label, icon }) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg bg-blue-600",
        {
          "bg-appointments": type === "appointments",
          "bg-pending": type === "pending",
          "bg-cancelled": type === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt="icon"
          height={32}
          width={32}
          className="size-8 w-fit"
        />
        <h2 className="text-[32px] font-bold text-white">{count}</h2>
      </div>
      <p className="text-[16px] font-sans">{label}</p>
    </div>
  );
};
export default StatCard;
