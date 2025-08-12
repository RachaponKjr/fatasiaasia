import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Type สำหรับ option ใน select
type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

// Type สำหรับ SelectWithLabel component
type SelectWithLabelProps = {
  label: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  options: SelectOption[];
  // Props สำหรับ native select (fallback)
  name?: string;
  multiple?: boolean;
};

const SelectWithLabel = ({
  label,
  id,
  placeholder = "เลือก...",
  required = false,
  disabled = false,
  value,
  onValueChange,
  className = "",
  options,
  name,
  ...props
}: SelectWithLabelProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ""
        }`}
      >
        {label}
      </label>
      
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        {...props}
      >
        <SelectTrigger className="w-full" id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectWithLabel;
export type { SelectWithLabelProps, SelectOption };