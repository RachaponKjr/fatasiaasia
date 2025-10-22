"use client";
import * as React from "react";
import { ChevronDown, Clock } from "lucide-react";
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

export function TimePicker({
  label,
  value,
  onChange,
}: {
  label?: string;
  /** timestamp (seconds) */
  value?: number;
  /** คืนค่า timestamp (seconds) */
  onChange: (timestamp: number) => void;
}) {
  const [time, setTime] = React.useState<string>("");
  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [period, setPeriod] = React.useState<string>("AM");

  // ✅ ถ้ามีค่า value เข้ามา ให้ตั้งค่าเริ่มต้น
  React.useEffect(() => {
    if (value) {
      const date = new Date(value * 1000);
      let h = date.getHours();
      const m = date.getMinutes();
      const p = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12; // แปลงเป็น 12-hour format

      setHour(h.toString().padStart(2, "0"));
      setMinute(m.toString().padStart(2, "0"));
      setPeriod(p);
      setTime(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${p}`
      );
    }
  }, [value]);

  // สร้าง list ของชั่วโมงและนาที
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleTimeChange = (
    newHour: string,
    newMinute: string,
    newPeriod: string
  ) => {
    if (newHour && newMinute && newPeriod) {
      const formattedTime = `${newHour}:${newMinute} ${newPeriod}`;
      setTime(formattedTime);

      // ✅ แปลงเป็น timestamp
      const date = new Date();
      let hourNum = parseInt(newHour);
      if (newPeriod === "PM" && hourNum !== 12) hourNum += 12;
      if (newPeriod === "AM" && hourNum === 12) hourNum = 0;
      date.setHours(hourNum);
      date.setMinutes(parseInt(newMinute));
      date.setSeconds(0);
      date.setMilliseconds(0);

      const timestamp = Math.floor(date.getTime() / 1000);
      onChange(timestamp);
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
      {label && (
        <label
          htmlFor="time"
          className="px-1 font-semibold text-2xl text-[#333333]"
        >
          {label}
        </label>
      )}
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
            {/* Hour */}
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

            {/* Minute */}
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

            {/* Period */}
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
