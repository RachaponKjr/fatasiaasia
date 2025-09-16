"use client";
import { useState } from "react";

export const Counter = ({
  initialValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange = () => {},
  label = "",
}: {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
  label?: string;
}) => {
  const [count, setCount] = useState(initialValue);

  const handleDecrement = () => {
    const newValue = Math.max(min, count - step);
    setCount(newValue);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, count + step);
    setCount(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center space-x-3">
      {label && (
        <span className="text-gray-700 font-medium mr-2">{label}:</span>
      )}

      {/* ปุ่ม - */}
      <button
        onClick={handleDecrement}
        disabled={count <= min}
        className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white 
                     flex items-center justify-center text-gray-600 text-lg font-bold
                     hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        −
      </button>

      {/* แสดงค่า */}
      <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
        {count}
      </span>

      {/* ปุ่ม + */}
      <button
        onClick={handleIncrement}
        disabled={count >= max}
        className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white 
                     flex items-center justify-center text-gray-600 text-lg font-bold
                     hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        +
      </button>
    </div>
  );
};
