import {
    Text,
    Flex,
    Center,
    Stack,
    Button,
    Image,
    Box,
  } from "@chakra-ui/react";

  import { Link } from "react-router-dom";
  
  import logo from "../Images/logo.png";
  import React, { useState, useEffect } from 'react';
  import { Fragment } from "react";
import Dashboard from "./Dashboard";
  
  function Title() {
  
    const [text, setText] = useState("");
  
    useEffect(() => {
      fetch("http://127.0.0.1:8080/linked-list-cycle")
        .then(response => response.text()) // Use response.text() to parse plain text response
        .then(data => {
          setText(data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
  
    return (
      <Fragment>
        <Box h={"100vh"} bg="black">
          <Box w="70vw" h="5vh" bg="black" />
           <Dashboard />
          <Flex
            width={"100vw"}
            height={"80vh"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Center>
              <Stack spacing={3}>
                <Center>

               
                <Text
                  whiteSpace="pre-line"
                  bgGradient="linear(to-l, #c0e6f0, #2f52a4)"
                  bgClip="text"
                  fontSize="6xl"
                  fontWeight="extrabold"
                  
                >
                  Welcome to Chatty
                </Text>
                </Center>
                <Text
                  bgGradient="linear(to-l, #c0e6f0, #2f52a4)"
                  bgClip="text"
                  fontSize="3xl"
                  fontWeight="extrabold"
                >
                  Interactively Practice Technical Interviews
                </Text>
                

              

                <Link to="/problems" >
                <Center>

               
                <Button
                  my={"20px"}
                  alignSelf={"center"}
                  size="md"
                  height="48px"
                  width="200px"
                  border="2px"
                  borderColor="blue.500"
                  variant="outline"
                  textColor={"white"}
                  _hover={{ bg: "blue.300", textColor: "white" }}
                >
                  Try Chatty
                </Button>
                </Center>
                </Link>
            
               
              </Stack>
            </Center>
          </Flex>
        </Box>
      </Fragment>
    );
  }
  
  export default Title;
  
