import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import {
  Heading,
  IconButton,
  VStack,
  HStack,
  useColorMode,
  useDisclosure,
  useToast,
  Link,
  Flex,
} from "@chakra-ui/react";

import { ArrowForwardIcon, LockIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "../../components/addtask";
import TaskList from "../../components/tasks";
import { useRouter } from "next/router";

export default function Behavior() {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const toast = useToast();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    let auth_token = "";
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      auth_token = foundUser.accessToken;
      setUser(foundUser);
    }
    if (!router.isReady) return;
    const { slug } = router.query;
    axios
      .get(`https://ambiguous-fantastic-andesaurus.glitch.me/behaviors/${slug}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => {
      if (task.id === id) {
        axios
          .delete(`https://ambiguous-fantastic-andesaurus.glitch.me/tasks/${task.id}`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          .then((res) => {
            console.log(res);
          });
      }
      return task.id !== id;
    });
    setTasks(newTasks);
  }

  function updateTask(id, body, onClose) {
    const info = body.trim();

    if (!info) {
      toast({
        title: "Enter your task",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const newTasksUpdate = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.name = body;
        task.behavior = data.id;
        axios
          .put(`https://ambiguous-fantastic-andesaurus.glitch.me/tasks/${task.id}`, task, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          .then((res) => {
            console.log(res);
          });
      }
      return task;
    });

    setTasks(newTasksUpdate);

    onClose();
  }

  function addTask(task) {
    console.log(task);
    task.behavior = data.id;
    axios
      .post(`https://ambiguous-fantastic-andesaurus.glitch.me/tasks/create`, task, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setTasks([...tasks, res.data]);
      });
  }

  function logout() {
    localStorage.removeItem("user");
    router.push("/");
  }

  function goBack() {
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>TrackDo | Behaviors</title>
        <meta
          name="description"
          content="A behavior based task management application for Eubrics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack p={4} minH="100vh" pb={28}>
        <HStack alignSelf="flex-end">
          <IconButton
            icon={<ArrowForwardIcon />}
            isRound="true"
            size="md"
            alignSelf="flex-end"
            onClick={goBack}
            title="Go Back"
          />
          <IconButton
            icon={<LockIcon />}
            isRound="true"
            size="md"
            alignSelf="flex-end"
            onClick={logout}
            title="Logout"
          />
        </HStack>

        <Heading
          p="5"
          fontWeight="extrabold"
          size="xl"
          bgGradient="linear(to-l, teal.300, blue.500)"
          bgClip="text"
        >
          {data ? data.name : "Loading..."}
        </Heading>
        <AddTask addTask={addTask} />
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </VStack>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
