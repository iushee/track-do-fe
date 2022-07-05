import { DeleteIcon } from "@chakra-ui/icons";
import {
  HStack,
  Box,
  VStack,
  IconButton,
  Flex,
  Button,
  Text,
  StackDivider,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import img from "../public/empty.svg";

import DeleteTask from "./deletetask";
import UpdateTask from "./updatetask";

function TaskList({ tasks, updateTask, deleteTask }) {
  if (!tasks.length) {
    return (
      <>
        <Box maxW="80%">
          <Image
            mt="20px"
            w="98%"
            maxW="350"
            src={img}
            alt="No task added :("
          />
        </Box>
      </>
    );
  }
  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems="stretch"
      >
        {tasks.map((task) => (
          <HStack key={task.id}>
            <Text w="100%" p="8px" borderRadius="lg">
              {task.name}
            </Text>
            <DeleteTask task={task} deleteTask={deleteTask}></DeleteTask>
            <UpdateTask task={task} updateTask={updateTask} />
          </HStack>
        ))}
      </VStack>
    </>
  );
}

export default TaskList;
