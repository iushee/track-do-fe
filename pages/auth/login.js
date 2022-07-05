import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import axios from "axios";
import Router from "next/router";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginError, setError] = useState(false);

  useEffect(() => {
    localStorage.removeItem("user");
  }, [""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server

    try {
      const res = await axios.post("https://ambiguous-fantastic-andesaurus.glitch.me/auth/login", user);
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      Router.push("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to keep your habits in track
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input
                onChange={({ target }) => setUsername(target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={({ target }) => setPassword(target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Text fontSize={"lg"} color={"red.600"}>
                {isLoginError && "Invalid username or password"}
              </Text>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
