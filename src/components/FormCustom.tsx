import { Flex, FormControl, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}

export const FormCustom: React.FC<Props> = ({
  label,
  value,
  setValue,
  onSubmit,
}) => {
  const handleKeyDown = (event) => {
    if (event?.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <FormControl>
      <Flex alignItems="center" maxW={"509px"}>
        <Input
          // sx={{ "&::placeholder": { color: "Black", fontWeight: "lg" } }}
          placeholder={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          // fontWeight="semibold"
          mr={2}
        />
      </Flex>
    </FormControl>
  );
};
