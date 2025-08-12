"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ label }: { label?: string }) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="flex flex-col gap-5">
      <label
        htmlFor="date"
        className="px-1 font-semibold text-2xl text-[#333333]"
      >
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-full h-[50px] !px-5 justify-between text-left font-normal"
          >
            <div className="flex gap-2 items-center">
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </div>
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
