import React, { useState, useEffect, Fragment } from "react";
import { Box, Flex, Center, Stack, Button, Image, Text, Table, Thead, Tbody, Tr, Th, Td, CardBody, Card } from "@chakra-ui/react";
import logo from "../Images/logo.png";

function Dashboard() {
  const [allQuestions, setAllQuestions] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8080/dashboard")
      .then(response => response.json())
      .then(data => {
        setAllQuestions(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Fragment>
      <Box h={"100vh"} w={"100vw"} overflowX="auto" bg="black">
        <Flex alignContent={"center"} justifyContent={"center"}>
          <Center>
            <Stack spacing={3}>
              <Flex alignContent={"center"} justifyContent={"center"}>
                <Stack direction="row" spacing={35}>
                  <Button
                    _hover={{ bg: "blue.300", textColor: "white" }}
                    my="10px"
                    colorScheme="blue"
                    variant="ghost"
                  >
                    About
                  </Button>
                  <Button
                    _hover={{ bg: "blue.300", textColor: "white" }}
                    my="10px"
                    colorScheme="blue"
                    variant="ghost"
                  >
                    Demo
                  </Button>
                  <Image
                    boxSize="60px"
                    objectFit="cover"
                    src={logo}
                    alt="Chatty"
                  />
                  <Button
                    _hover={{ bg: "blue.300", textColor: "white" }}
                    my="10px"
                    colorScheme="blue"
                    variant="ghost"
                  >
                    Services
                  </Button>
                  <Button
                    _hover={{ bg: "blue.300", textColor: "white" }}
                    my="10px"
                    colorScheme="blue"
                    variant="ghost"
                  >
                    Contact
                  </Button>
                </Stack>
              </Flex>
              <Text
                bgGradient="linear(to-l, #c0e6f0, #2f52a4)"
                bgClip="text"
                fontSize="5xl"
                fontWeight="extrabold"
              >
                Problem Set
              </Text>
             
              <Box maxH="80vh" overflowY="auto">
                <Table variant="styled" colorScheme="gray" bg="black" >
                  <Thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'black' }}>
                    <Tr>
                      <Th color={"white"}>Title</Th>
                      <Th color={"white"}>Difficulty</Th>
                      <Th color={"white"}>Topic</Th>
                    </Tr>
                  </Thead>
                  
                  <Tbody color={"white"} >
                    {Object.values(allQuestions).map((question, index) => (
                      <Tr key={index}>
                        <Td>
                          <a href={`/question/${question.titleSlug}`} style={{ color: "white", fontWeight: "bold" }}>
                            {question.title}
                          </a>
                        </Td>
                        <Td>{question.difficulty}</Td>
                        <Td>
                          {question.topicTags && question.topicTags.length > 0
                            ? question.topicTags[0].name
                            : 'No topic tag'}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  
                </Table>
              </Box>
            </Stack>
          </Center>
        </Flex>
      </Box>
    </Fragment>
  );
}

export default Dashboard;
