"use client";

import { Data } from "@measured/puck";

const validateLayout = (data: Data) => {
  // Check if the layout has a single content type block
  if (data.content.filter((block) => block.type == "Content").length !== 1) {
    return "Layout must have exactly one content block";
  }
  return false;
};

export default validateLayout;
