"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectDuration = ({ onUserSelect }) => {
  const [duration, setDuration] = useState(0);
  return (
    <div className="mt-10">
      <h2 className="text-primary font-bold text-2xl">Duration</h2>
      <p className="text-gray-600">Select the duration</p>
      <Select
        onValueChange={(value) => {
          setDuration(value);
          onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full mt-4 p-6 text-lg">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Duration</SelectLabel>
            <SelectItem value={30}>30 Seconds</SelectItem>
            <SelectItem value={60}>60 Seconds</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
