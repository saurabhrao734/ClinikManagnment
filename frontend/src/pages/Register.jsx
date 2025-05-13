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
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

// 2. Update the breakpoints as key-value pairs

const Register = () => {
  const [role, setRole] = useState("doctor");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelected = (value) => {
    setRole(value);
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (toast.isActive("t1")) {
      toast.closeAll();
    }

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`, {
        username,
        fullname,
        mobile_no: mobileNo,
        role: role.toLowerCase(),
        email,
        password,
      })
      .then((response) => {
        setError(false);
        setIsLoading(false);

        toast({
          id: "t1",
          title: "Registration successful.",
          description: "Your account has been created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);

        if (error?.response?.status === 400) {
          toast({
            id: "t1",
            title: "Registration Failed.",
            description: "All fields are required or User already exists",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (error?.response?.status === 500) {
          toast({
            id: "t1",
            title: "Registration Failed.",
            description: "Server error while creating user",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.log(error.response);
          toast({
            id: "t1",
            title: "Registration Failed.",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
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
            onSubmit={registerSubmitHandler}
          >
            <Grid gap={3}>
              <Heading color="black.200" textAlign="center">
                Register
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
                <FormLabel my="0px">Full Name</FormLabel>
                <Input
                  type="text"
                  rounded="10px"
                  fontSize="20px"
                  color="black"
                  bgColor="white"
                  placeholder="Enter your Full Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  isInvalid={error && !fullname}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="0px">Username</FormLabel>
                <Input
                  type="text"
                  rounded="10px"
                  fontSize="20px"
                  color="black"
                  bgColor="white"
                  placeholder="Enter your User name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={error && !username}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="0px">Mobile No.</FormLabel>
                <Input
                  type="number"
                  rounded="10px"
                  fontSize="20px"
                  color="black"
                  bgColor="white"
                  placeholder="Enter your Mobile Number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  isInvalid={error && !mobileNo}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel my="0px">Email</FormLabel>
                <Input
                  type="email"
                  rounded="10px"
                  fontSize="20px"
                  color="black"
                  bgColor="white"
                  placeholder="Enter your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={error && !email}
                />
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
                onClick={registerSubmitHandler}
                color="white"
                isLoading={isLoading}
                loadingText="Logging in"
              >
                Register
              </Button>
            </Grid>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};

export default Register;
