import { Input } from "./ui/input";
import { ComponentProps, ChangeEvent } from "react";

// สร้าง type ที่รวม props ของ Input component
type InputElementProps = ComponentProps<typeof Input>;

// กำหนด type สำหรับ props ที่เราต้องการ
type InputWithLabelProps = {
  label: string;
  id: string | number;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "color"
    | "file"
    | "hidden"
    | "range";
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & Omit<InputElementProps, "id" | "className">; // ไม่ให้ซ้ำกับ props ที่เรากำหนด

const InputWithLabel = ({
  label,
  id,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  value,
  onChange,
  className = "",
  ...props
}: InputWithLabelProps) => {
  return (
    <div className={`flex flex-col gap-3 text-[#1A1A1A] ${className}`}>
      <label
        htmlFor={String(id)} // แปลง id เป็น string สำหรับ htmlFor
        className={`text-lg font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ""
        }`}
      >
        {label}
      </label>
      <Input
        id={String(id)} // แปลง id เป็น string
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="w-full"
        {...props}
      />
    </div>
  );
};

export default InputWithLabel;
export type { InputWithLabelProps };
