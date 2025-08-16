"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CounterProps {
  label: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function BookingCounter({
  label,
  value = 0,
  min = 0,
  max = 99,
  onChange,
  className,
}: CounterProps) {
  const [count, setCount] = React.useState(value);

  const handleIncrement = () => {
    if (count < max) {
      const newValue = count + 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      const newValue = count - 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border border-[#33333333] rounded-lg bg-white",
        className
      )}
    >
      <span className="text-xl font-bold text-[#333333]">{label}</span>

      <div className="flex">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDecrement}
          disabled={count <= min}
          className="h-[50px] w-[50px] rounded-r-none rounded-l-[8px] border border-[#EFEFEF] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="text-base font-medium aspect-square w-[50px] bg-[#EFEFEF] grid place-content-center text-center">
          {count}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleIncrement}
          disabled={count >= max}
          className="h-[50px] w-[50px] rounded-l-none rounded-r-[8px] border border-[#EFEFEF] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
