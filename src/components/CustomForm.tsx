import { Control, ControllerRenderProps } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import Image from "next/image";
import { Input } from "./ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";
import { FormFieldType } from "@/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomFormProps {
  name: string;
  control: Control<any>;
  label?: string;
  fieldType: FormFieldType;
  iconSrc?: string;
  iconAlt?: string;
  placeholder?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  renderSkeleton?: (
    field: ControllerRenderProps<any, string>
  ) => React.ReactNode;
}

interface RenderFieldProps {
  field: ControllerRenderProps<any, string>;
  props: CustomFormProps;
}

const RenderField: React.FC<RenderFieldProps> = ({ field, props }) => {
  const {
    fieldType,
    iconSrc,
    name,
    iconAlt,
    placeholder,
    renderSkeleton,
    disabled,
    children,
    dateFormat,
    showTimeSelect,
    label,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="border-0 bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              type="password"
              placeholder={placeholder}
              className="border-0 bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            value={(field.value as E164Number) || undefined}
            onChange={field.onChange}
            defaultCountry="BD"
            placeholder={placeholder}
            international
            withCountryCallingCode
            className="mt-2 h-11 rounded-md px-3 text-sm border bg-dark-400 placeholder:text-dark-600 border-dark-500 !important"
          />
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex bg-dark-400 rounded border border-dark-500 p-3">
          <Image
            src={"/assets/icons/calendar.svg"}
            alt="calendar"
            width={24}
            height={24}
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "P"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker-input"
              placeholderText={placeholder}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus:ring-0 focus:ring-offset-0 !important rounded">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-dark-400 border-dark-500 !important rounded">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded"
            disabled={disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              disabled={disabled}
            />
            <Label
              htmlFor={name}
              className="cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
            >
              {label}
            </Label>
          </div>
        </FormControl>
      );
    default:
      return;
  }
};

const CustomForm: React.FC<CustomFormProps> = (props) => {
  const { name, control, label, fieldType } = props;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <Label className="text-[16px]">{label}</Label>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400 !inportant" />
        </FormItem>
      )}
    />
  );
};
export default CustomForm;
