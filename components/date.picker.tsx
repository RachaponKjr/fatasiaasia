"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalenderIcon from "@/assets/icons/calender";

export function DatePicker({
  label,
  value,
  onChange,
}: {
  label?: string;
  /** รับค่า timestamp (วินาที) */
  value?: number;
  /** ส่งค่า timestamp (วินาที) ออกไปเมื่อเปลี่ยน */
  onChange?: (timestamp: number) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value * 1000) : undefined
  );

  const handleSelect = (newDate?: Date) => {
    if (newDate) {
      setDate(newDate);
      const timestamp = Math.floor(newDate.getTime() / 1000);
      onChange?.(timestamp);
    }
  };

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value * 1000));
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-5">
      {label && (
        <label
          htmlFor="date"
          className="px-1 font-semibold text-2xl text-[#333333]"
        >
          {label}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-full h-[50px] !px-5 justify-between text-left font-normal"
          >
            <div className="flex gap-2 items-center">
              <div className="scale-110">
                <CalenderIcon size={24} />
              </div>
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </div>
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            selected={date}
            onSelect={handleSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
