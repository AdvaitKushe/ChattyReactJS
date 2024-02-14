import {
    Text,
    Flex,
    Center,
    Stack,
    Button,
    Image,
    Box,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom"; // Import Link from React Router
  
  import logo from "../Images/logo.png";
  
  function Dashboard() {
    return (
      <>
        <Flex alignContent={"center"} justifyContent={"center"}>
          <Stack direction="row" spacing={35}>
            <Link to="/about"> {/* Link to the about page */}
              <Button
                _hover={{ bg: "blue.300", textColor: "white" }}
                my="10px"
                colorScheme="blue"
                variant="ghost"
              >
                About
              </Button>
            </Link>
            <Link to="/demo"> {/* Link to the demo page */}
              <Button
                _hover={{ bg: "blue.300", textColor: "white" }}
                my="10px"
                colorScheme="blue"
                variant="ghost"
              >
                Demo
              </Button>
            </Link>
            <Link to ="/"><Image boxSize="60px" objectFit="cover" src={logo} alt="Chatty" /></Link>
            <Link to="/problems"> {/* Link to the problems page */}
              <Button
                _hover={{ bg: "blue.300", textColor: "white" }}
                my="10px"
                colorScheme="blue"
                variant="ghost"
              >
                Problems
              </Button>
            </Link>
            <Link to="/contact"> {/* Link to the contact page */}
              <Button
                _hover={{ bg: "blue.300", textColor: "white" }}
                my="10px"
                colorScheme="blue"
                variant="ghost"
              >
                Contact
              </Button>
            </Link>
          </Stack>
        </Flex>
      </>
    );
  }
  
  export default Dashboard;
  