"use client";
import * as React from "react";
import { ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TimePicker({ label }: { label?: string }) {
  const [time, setTime] = React.useState<string>("");
  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [period, setPeriod] = React.useState<string>("AM");

  // Generate hours (1-12)
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return hour.toString().padStart(2, "0");
  });

  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => {
    return i.toString().padStart(2, "0");
  });

  const handleTimeChange = (
    newHour: string,
    newMinute: string,
    newPeriod: string
  ) => {
    if (newHour && newMinute && newPeriod) {
      const formattedTime = `${newHour}:${newMinute} ${newPeriod}`;
      setTime(formattedTime);
    }
  };

  const handleHourChange = (value: string) => {
    setHour(value);
    handleTimeChange(value, minute, period);
  };

  const handleMinuteChange = (value: string) => {
    setMinute(value);
    handleTimeChange(hour, value, period);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    handleTimeChange(hour, minute, value);
  };

  return (
    <div className="flex flex-col gap-5">
      <label
        htmlFor="time"
        className="px-1 font-semibold text-2xl text-[#333333]"
      >
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!time}
            className="data-[empty=true]:text-muted-foreground w-full h-[50px] !px-5 justify-between text-left font-normal"
          >
            <div className="flex gap-2 items-center">
              <div className="scale-110">
                <Clock size={24} />
              </div>
              {time ? time : <span>Pick a time</span>}
            </div>
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Hour</label>
              <Select value={hour} onValueChange={handleHourChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="12" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Minute</label>
              <Select value={minute} onValueChange={handleMinuteChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="00" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Period</label>
              <Select value={period} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
