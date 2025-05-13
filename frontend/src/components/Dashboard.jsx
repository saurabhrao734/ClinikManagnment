import { Box, Divider, Flex, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { GlobalContext } from "../context/GlobalContext";
const Dashboard = () => {
  const [AddPatientInformation, setAddPatientInformation] = useState([]);
  const [revenueInformation, setRevenueInformation] = useState([]);
  const [averageAppointments, setAverageAppointments] = useState(0);
  const { currentUser, expirationTime, setCurrentUser } =
    useContext(GlobalContext);
  const toast = useToast();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "doctor") {
      toast({
        title: "Invalid Role.",
        description: "Only doctor can access this page.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (Date.now() > expirationTime) {
      setCurrentUser(null);
      navigator("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/doctor/revenueInfo`)
        .then((response) => {
          console.log("===  Dashboard.jsx [31] ===", revenueInformation);
          setRevenueInformation(response.data.data);
        })
        .catch((error) =>
          toast({
            title: "Unable fetch data.",
            description:
              "Something went wrong when fetching patient visit count",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        );

      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/doctor/patientCountInfo`)
        .then((response) => setAddPatientInformation(response.data.data))
        .catch((error) =>
          toast({
            title: "Unable fetch data.",
            description: "Something went wrong when fetching revenue",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        );

      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/doctor/averageAppointments`)
        .then((response) =>
          setAverageAppointments(response.data.data.avgAppointments)
        )
        .catch((error) =>
          toast({
            title: "Unable fetch data.",
            description:
              "Something went wrong when fetching average appointments",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        );
    }
  }, []);

  return (
    <SimpleGrid gap={3} columns={{ xl: 3, md: 2 }} h="100%" p={10}>
      {/* <Box fontSize="2rem">Patient Information</Box>
        <Divider mb={3} /> */}

      {AddPatientInformation.map((info, index) => {
        return (
          <Flex
            key={index}
            flex="1"
            bgColor="cyan.50"
            // p={5}
            rounded="md"
            direction="column"
            justify="center"
          >
            <Box fontSize="1.5rem" color="cyan.600" textAlign="center">
              {info.title}
            </Box>
            <Box
              fontSize="2rem"
              fontWeight="bold"
              color="cyan.600"
              textAlign="center"
            >
              {info.count}
            </Box>
          </Flex>
        );
      })}

      {/* <Box fontSize="2rem">Patient Information</Box>
        <Divider mb={3} /> */}

      {revenueInformation.map((info, index) => {
        return (
          <Flex
            key={index}
            flex="1"
            bgColor="cyan.50"
            p={5}
            rounded="md"
            direction="column"
            justify="center"
          >
            <Box fontSize="1.5rem" color="cyan.600" textAlign="center">
              {info.title}
            </Box>
            <Box
              fontSize="2rem"
              fontWeight="bold"
              color="cyan.600"
              textAlign="center"
            >
              {info.count}
            </Box>
          </Flex>
        );
      })}

      <Flex
        bgColor="cyan.50"
        p={5}
        rounded="md"
        direction="column"
        justify="center"
        gridColumn={{ xl: "1 / span 3", md: "1 / span 2" }}
      >
        <Box fontSize="1.5rem" color="cyan.600" textAlign="center">
          Average Appointments
        </Box>
        <Box
          fontSize="2rem"
          fontWeight="bold"
          color="cyan.600"
          textAlign="center"
        >
          {averageAppointments}
        </Box>
      </Flex>
    </SimpleGrid>
  );
};

export default Dashboard;
