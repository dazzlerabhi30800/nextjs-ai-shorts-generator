"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectTopic = ({ onUserSelect }) => {
  const options = [
    "Custom Prompt",
    "AI Stories",
    "Scary Boy",
    "Historical Facts",
    "Bed Time Story",
    "Motivational",
    "Fun Facts",
  ];
  const [selectOption, setSelectOption] = useState("");
  return (
    <div>
      <h2 className="text-primary font-bold text-2xl">Content</h2>
      <p className="text-gray-600">What is the topic of your video?</p>
      <Select
        onValueChange={(value) => {
          setSelectOption(value);
          value !== "Custom Prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full mt-4 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Content Type</SelectLabel>
            {options.map((option, index) => (
              <SelectItem value={option} key={index}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectOption === "Custom Prompt" && (
        <Textarea
          className="mt-4"
          onChange={(e) => onUserSelect("topic", e.target.value)}
          placeholder="Write your Custom prompt to generate video."
        />
      )}
    </div>
  );
};

export default SelectTopic;
