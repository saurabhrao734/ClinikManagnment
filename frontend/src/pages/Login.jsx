import {
  Flex,
  Container,
  Image,
  FormControl,
  Heading,
  FormLabel,
  RadioGroup,
  HStack,
  Box,
  Input,
  Grid,
  Button,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [role, setRole] = useState("doctor");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser, setExpirationTime } =
    useContext(GlobalContext);
  const navigator = useNavigate();
  const toast = useToast();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "doctor") navigator("/user/doctor/dashboard");
      else navigator("/user/receptionist/add-details");
    
    }
  }, []);

  const handleSelected = (value) => {
    setRole(value);
  };

  const loginSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (toast.isActive("t1")) {
      toast.closeAll();
    }

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        role: role.toLowerCase(),
        username,
        password,
      })
      .then((response) => {
        setError(false);
        setIsLoading(false);
        const loggedInUser = response.data.data;
        setCurrentUser(loggedInUser);
        setExpirationTime(Date.now() + 7 * 24 * 60 * 60 * 1000);
        toast({
          id: "t1",
          title: "Login successful.",
          description: "You are logged into your account",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (loggedInUser?.role === "doctor")
          navigator("/user/doctor/dashboard");
        else navigator("/user/receptionist/add-details");
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
        if (error?.response?.status === 400)
          toast({
            id: "t1",
            title: "Login Failed.",
            description: "All fields are required",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        else if (error?.response?.status === 404)
          toast({
            id: "t1",
            title: "Login Failed.",
            description: "Invalid role chosen",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        else if (error?.response?.status === 409) {
          setPassword("");
          toast({
            id: "t1",
            title: "Login Failed.",
            description: "Incorrect Password",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else
          toast({
            id: "t1",
            title: "Login Failed.",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
      });
  };

  return (
    <>
      <Flex
        justifyContent="center"
        direction={{ md: "row", sm: "column", base: "column" }}
        alignItems="center"
        height="100vh"
        gap={{ md: "10%", sm: "1px", base: "0px" }}
        width="100"
      >
        <Flex>
          <Container maxW="600px" minW="60px" centerContent>
            <Image
              width={{ md: "90%", sm: "80%", base: "70%" }}
              src="./src/assets/logo.png"
            
              filter="drop-shadow(0px 0px 20px #0bc5ea)"
            ></Image>
          </Container>
        </Flex>
        <Flex
          p="20px"
          width={{ sm: "100%" }}
          justifyContent="center"
          maxW="500px"
        >
          <FormControl
            width={{ sm: "90%", base: "90%" }}
            bgColor="cyan.50"
            minW="300px"
            p={10}
            maxW="400px"
            onSubmit={loginSubmitHandler}
          >
            <Grid gap={3}>
              <Heading color="black.200" textAlign="center">
                Login
              </Heading>
              <FormControl>
                <FormLabel color="black">User Type</FormLabel>
                <RadioGroup defaultValue="">
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    position="relative"
                    py={1}
                    border="2px solid"
                    borderColor="cyan.500"
                    rounded="md"
                    transition={"color 0.3s"}
                  >
                    <Box
                      textAlign="center"
                      zIndex={2}
                      fontSize="1.2rem"
                      fontWeight={600}
                      color={role === "doctor" ? "white" : "cyan.500"}
                      onClick={() => handleSelected("doctor")}
                    >
                      Doctor
                    </Box>
                    <Box
                      textAlign="center"
                      zIndex={2}
                      fontSize="1.2rem"
                      fontWeight={600}
                      color={role === "doctor" ? "cyan.500" : "white"}
                      onClick={() => handleSelected("receptionist")}
                    >
                      Receptionist
                    </Box>
                    <Box
                      position="absolute"
                      width="50%"
                      height="100%"
                      bg="cyan.500"
                      zIndex={0}
                      transform={
                        role === "doctor"
                          ? "translateX(0%)"
                          : "translateX(100%)"
                      }
                      transition={"transform 0.3s"}
                    ></Box>
                  </Grid>
                </RadioGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="0px">Username</FormLabel>
                <Input
                  type="text"
                  rounded="10px"
                  fontSize="20px"
                  color="black"
                  bgColor="white"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={error && !username}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="0px">Password</FormLabel>
                <Input
                  id={Date.now()}
                  type="password"
                  rounded="10px"
                  fontSize="20px"
                  color="black"
                  bgColor="white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={error && !password}
                ></Input>
              </FormControl>

              <Button
                type="submit"
                colorScheme="cyan"
                onClick={loginSubmitHandler}
                color="white"
                isLoading={isLoading}
                loadingText="Logging in"
              >
                Login
              </Button>
            </Grid>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
