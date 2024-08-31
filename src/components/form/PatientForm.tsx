"use client";

import { UserFormValidation } from "@/Schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomForm from "./../CustomForm";
import { Input } from "../ui/input";
import { FormFieldType } from "@/constant";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

const PatientForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState<any>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await createUser(values);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error: any) {
      form.setError("email",{type: "409", message: "User already exists"});
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header text-white">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomForm
          name="name"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          label="Full Name"
          placeholder="Billal Hossain"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomForm
          name="email"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          label="Email"
          placeholder="example@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <p>{errors?.email && errors.email?.message}</p>
        <CustomForm
          name="phone"
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          label="Phone Number"
          placeholder="+880 1515 00653"
        />
        <CustomForm
          name="password"
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
          label="Password"
          placeholder="********"
        />
        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};
export default PatientForm;
