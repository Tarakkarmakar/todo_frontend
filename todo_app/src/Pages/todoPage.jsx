// TodoList.js
import React, { useEffect, useState } from "react";
import TodoItem from "../components/todoItem";

import {
  VStack,
  Box,
  Button,
  Flex,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo, fetchTodos } 
from "../Redux/action";
import NavBar from "../components/navBar";
const TodoPage = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [newTodoText, setNewTodoText] = useState("");
  const toaster = useToast();
useEffect(()=>{
  dispatch(fetchTodos())
},[])
  // fetch the products when dispatch
  useEffect(() => {
    dispatch(fetchTodos());

  }, [dispatch]);


  const handleAddTodo = () => {
    // Dispatch the addTodo action to add a new todo
    if (newTodoText.trim() !== "") {
      dispatch(
        addTodo({ title: newTodoText, description: "", completed:0})
      );
      setNewTodoText("");

      toaster({
        title: `Your Todo Have added`,
        duration: 2000,
        position: "top",
        status: "success",
        isClosable: true,
      });
    }
  };
 
  //dispatch the deleteTodo action
  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));

  }; // Dispatch the searchTodos action


  console.log(todos);
  return (
    <>
      <NavBar />
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="center"
        align="center"
        bg="blue.500"
        color="white"
        p={4}
        wrap="wrap"
      >
        <Box
          bg="blue.500"
          p={4}
          color="white"
          borderRadius="md"
          w={{ base: "100%", sm: "100%", md: "50%", lg: "40%" }}
          mb={{ base: 4, lg: 0 }}
        >
          <VStack spacing={4}>
            <Heading>Add New Todo</Heading>
            <FormControl>
              <Input
                type="text"
                placeholder="Add a new todo"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                bg="white"
                color="black"
              />
            </FormControl>
            <Button colorScheme="orange" onClick={handleAddTodo}>
              Add
            </Button>
          
            <Heading size="sm">Todo List</Heading>
          </VStack>
        </Box>
      </Flex>
      <Center>
        <Stack
          direction="column"
          spacing={4}
          bg="blue.500"
          p={4}
          color="white"
          borderRadius="md"
          w={{ base: "100%", sm: "100%", md: "50%", lg: "40%" }}
        >
          {todos.length ? (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onDelete={() => handleDeleteTodo(todo.id)}
              />
            ))
          ) : (
            <h3>No Todo found</h3>
          )}
        </Stack>
      </Center>
    </>
  );
};

export default TodoPage;
