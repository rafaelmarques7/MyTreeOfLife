import { useState } from "react";
import { Select, Input, Flex, FormControl } from "@chakra-ui/react";

interface Props {
  label: string;
  labelArray: Set<string>;
  setValue: (s: string) => void;
}
export const DropdownWithFreeText: React.FC<Props> = ({
  label,
  labelArray,
  setValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(label);
  const [textInputValue, setTextInputValue] = useState("");

  const handleChange = (event) => {
    const val = event.target.value;
    setSelectedValue(val);
    if (val === "other") {
      setTextInputValue("");
    }
    setValue(event.target.value);
  };

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);
    setValue(event.target.value);
  };

  let options = [
    <option key={`dropdown-relationship-other`} value="Other">
      Enter your own
    </option>,
  ];

  labelArray.forEach((label) =>
    options.push(
      <option key={`dropdown-relationship-${label}`} value={label}>
        {label}
      </option>
    )
  );

  return (
    <FormControl>
      <Flex maxW={"500px"}>
        <Select
          placeholder={label}
          value={selectedValue}
          onChange={handleChange}
          flex="1"
        >
          {options}
        </Select>
        {selectedValue === "Other" && (
          <Input
            placeholder="Enter your own value"
            value={textInputValue}
            onChange={handleTextInputChange}
            ml="2"
            flex="1"
          />
        )}
      </Flex>
    </FormControl>
  );
};
