"use client";

import {
  PatientFormDefaultValues,
  PatientFormValidation,
} from "@/Schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "../ui/form";
import CustomForm from "./../CustomForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRouter } from "next/navigation";
import {
  Doctors,
  FormFieldType,
  GenderOptions,
  IdentificationTypes,
} from "@/constant";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { registerUser } from "@/lib/actions/patient.actions";

const RegisterForm: React.FC<{ user: User }> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      console.log("formData,", formData);
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
      console.log("formData,", formData);
    }

    try {
      const patient = {
        name: values.name,
        email: values.email,
        phone: values.email,
        birthDate: values.birthDate,
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        userId: user.$id,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };
      const newUser = await registerUser(patient);
      if (newUser) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-12"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header text-white">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself</p>
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
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              name="email"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              label="Email"
              placeholder="Billal Hossain"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomForm
              name="phone"
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              label="Phone Number"
              placeholder="+880 1515 00653"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              name="birthDate"
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              label="Date of Birth"
              placeholder="01/01/2024"
            />
            <CustomForm
              name="gender"
              control={form.control}
              fieldType={FormFieldType.SKELETON}
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {GenderOptions.map((option, i) => (
                      <Label key={i} htmlFor={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <p>{option}</p>
                      </Label>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              name="address"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              label="Address"
              placeholder="H: 03 - R: 05 - Kaderabad Housing - Mohammadpur Dhaka 1207"
            />
            <CustomForm
              name="occupation"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              label="Occupation"
              placeholder="Student"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              name="emergencyContactName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              label="Emergency contact name"
              placeholder="Gurardian's name"
            />
            <CustomForm
              name="emergencyContactNumber"
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              label="Emergency contact number"
              placeholder="+880 1515 00653"
            />
          </div>
          <section className=" mb-12 space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="text-[18px] font-bold leading-[18px] md:text-[24px]">
                Madical information
              </h2>
            </div>
          </section>
          <CustomForm
            name="primaryPhysician"
            control={form.control}
            fieldType={FormFieldType.SELECT}
            label="Primary physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem
                key={i}
                value={doctor.name}
                className="hover:outline-none focus:outline-none m-3"
              >
                <div className="flex cursor-pointer intems-center gap-2 !important">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-dark-500"
                  />
                  <p className="flex items-center">{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomForm>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              name="insuranceProvider"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              label="Insurance provider"
              placeholder="USH-UNES"
            />
            <CustomForm
              name="insurancePolicyNumber"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              label="Insurance policy number"
              placeholder="123456789"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              name="allergies"
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              label="Allergies (if any)"
              placeholder="Penuts, Pencillin, pollen"
            />
            <CustomForm
              name="currentMedication"
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              label="Current medication (if any)"
              placeholder="Ibuprofen 200mg, Paracetamol 500mg"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              name="familyMedicalHistory"
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              label="Family medical history  (if relevant)"
              placeholder="Father has hypertension, Mother had tb"
            />
            <CustomForm
              name="pastMedicalHistory"
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
          <section className=" mb-12 space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="text-[18px] font-bold leading-[18px] md:text-[24px]">
                Identyfication and verification
              </h2>
            </div>{" "}
            <CustomForm
              name="identificationType"
              fieldType={FormFieldType.SELECT}
              label="Identification Type"
              placeholder="Select identification type"
              control={form.control}
            >
              {IdentificationTypes.map((type, i) => (
                <SelectItem
                  key={type + i}
                  value={type}
                  className="focus:outline-none m-3"
                >
                  {type}
                </SelectItem>
              ))}
            </CustomForm>
            <CustomForm
              name="identyficationNumber"
              control={form.control}
              label="Identyfication Number"
              fieldType={FormFieldType.INPUT}
              placeholder="1234567890"
            />
            <CustomForm
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Scanned copy of identification Document"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
              )}
            />
          </section>

          <section className=" mb-12 space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="text-[18px] font-bold leading-[18px] md:text-[24px]">
                Consent and privacy.
              </h2>
            </div>
            <CustomForm
              name="treatmentConsent"
              control={form.control}
              fieldType={FormFieldType.CHECKBOX}
              label="I consent to receive treatment for my health condition."
            />
            <CustomForm
              name="disclosureConsent"
              control={form.control}
              fieldType={FormFieldType.CHECKBOX}
              label="I consent to the use and disclosure of my health
            information for treatment purposes."
            />
            <CustomForm
              name="privacyConsent"
              control={form.control}
              fieldType={FormFieldType.CHECKBOX}
              label="I acknowledge that I have reviewed and agree to the
            privacy policy"
            />
          </section>
          <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
        </form>
      </Form>
    </>
  );
};
export default RegisterForm;
