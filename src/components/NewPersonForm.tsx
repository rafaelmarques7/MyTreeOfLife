import { Button, Container, Flex, FormControl, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  newPersonName: string;
  setNewPersonName: Dispatch<SetStateAction<string>>;
  handleButtonClick: () => Promise<void>;
}

export const NewPersonForm: React.FC<Props> = ({
  newPersonName,
  setNewPersonName,
  handleButtonClick,
}) => {
  const handleKeyDown = (event) => {
    if (event?.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <Container maxW="xl">
      <FormControl>
        <Flex alignItems="center">
          <Input
            placeholder="Create new Person"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            onKeyDown={handleKeyDown}
            fontWeight="semibold"
            mr={2}
          />
          <Button onClick={() => handleButtonClick()}>Do it!</Button>
        </Flex>
      </FormControl>
    </Container>
  );
};
