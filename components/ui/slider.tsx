"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      onValueChange?.([newValue]);
    };

    return (
      <div className="relative w-full touch-none select-none">
        <input
          type="range"
          ref={ref}
          value={value?.[0]}
          onChange={handleChange}
          className={cn(
            "w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer",
            "range-input:h-5 range-input:w-5 range-input:rounded-full range-input:border-2",
            "range-input:border-primary range-input:bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }