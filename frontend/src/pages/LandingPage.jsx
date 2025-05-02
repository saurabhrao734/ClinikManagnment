import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

import img from "../assets/landing-page-logo.png";

const LandingPage = () => {
  return (
    <Flex h="100svh" align="center" direction="column">
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="center"
        px={10}
        py={5}
      >
        <Heading
          as="h1"
          size="xl"
          bgGradient="linear(to-r, cyan.400, cyan.600)"
          backgroundClip="text"
        >
          Dr. Rajendra kumar kasana
        </Heading>
        <NavLink to="/login">
          <Button colorScheme="cyan" variant="outline" size="md">
            Login
          </Button>
        </NavLink>
      </Flex>
      <Flex align="center" justify="center" flex={1} bgColor="cyan.50">
        <Image src={img} alt="doctor" w="300px" mx="5%" />
        <Flex direction="column" justify="center" align="center" px="5%">
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, cyan.400, cyan.600)"
            backgroundClip="text"
          >
            Dedicated Care for Your Little Ones
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Personalized and compassionate care for every child's health needs
          </Text>
          <Text color={"gray.500"} mb={6} textAlign="center">
            With over 30+ years of experience,Dr. Rajendra provides expert
            medical attention with a gentle touch, ensuring your child's
            well-being and comfort.
          </Text>
          {/* <Button
            colorScheme="cyan"
            color="white"
            bgGradient="linear(to-r, cyan.400, cyan.500, cyan.600)"
            size="lg"
            textTransform={"uppercase"}
          >
            Book an Appointment
          </Button> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
