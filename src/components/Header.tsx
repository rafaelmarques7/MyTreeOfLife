import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { FaTree } from "react-icons/fa";

export const Header = () => {
  return (
    <Flex align="center" bg="gray.600" px={4} py={2}>
      <IconButton
        icon={<FaTree />}
        aria-label="Tree Icon"
        colorScheme="green"
      />
      <Heading as="h1" size="lg" color="white" px={6}>
        My Tree of Life
      </Heading>
    </Flex>
  );
};
