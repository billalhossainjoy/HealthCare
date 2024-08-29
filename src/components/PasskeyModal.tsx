"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const PasskeyModal: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const path = usePathname();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    if (path) {
      const accesskey = encryptedKey && atob(encryptedKey);

      if (accesskey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey, path, router, passkey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setError("");
      const excryptedKey = btoa(passkey);
      localStorage.setItem("accessKey", excryptedKey);
      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent className="space-y-5 bg-dark-400 rounded-[10px] border-dark-500 !important">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center cursor-text flex-col">
          <InputOTP maxLength={6} value={passkey} onChange={setPasskey}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-red-500 text-sm mt-4 w-full flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePasskey(e)}>
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PasskeyModal;
