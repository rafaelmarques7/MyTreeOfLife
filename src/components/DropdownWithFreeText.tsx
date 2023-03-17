import { Select } from "@chakra-ui/react";
import React from "react";

const DropdownWithFreeText = ({ label, nodes, value, onChange }) => {
  return (
    <Select placeholder={label} value={value} onChange={onChange}>
      {nodes.map((node) => {
        const label = node.properties?.name;
        return (
          <option key={`dropdown-${label}`} value={node.elementId}>
            {label}
          </option>
        );
      })}
    </Select>
  );
};
