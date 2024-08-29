import Image from "next/image";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

const SubmitButton: React.FC<Props> = ({ isLoading, children, className }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        "bg-green-500 w-full text-white disabled:bg-green-500 rounded hover:bg-green-700",
        className
      )}
    >
      {isLoading ? (
        <div className="flex gap-2">
          <Loader2 className="animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
export default SubmitButton;
