import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { PersonNode } from "../interfaces";

interface Props {
  data: PersonNode[];
}

export const PersonList: React.FC<Props> = ({ data }) => {
  return (
    <Box ml="4">
      <Flex direction="column" alignItems="center">
        <Text
          borderBottom="1px solid black"
          fontWeight={"bold"}
          pl="100"
          pr="100"
          mb="3"
        >
          People
        </Text>
      </Flex>

      <Box>
        <List spacing={1}>
          {data.map((item, index) => (
            <ListItem key={`list-item-${index}`} textAlign="center">
              {item.name}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
