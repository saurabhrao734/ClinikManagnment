import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Table,
  InputGroup,
  Input,
  Grid,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Divider,
  AbsoluteCenter,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Schedules = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const { currentUser, rowHoverBgColor, appBgColor } =
    useContext(GlobalContext);
  const toast = useToast();
  const navigator = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  // Demo Commit

  useEffect(() => {
    if (!currentUser) {
      toast({
        title: "Unauthorized Request",
        description: "Login to access this page.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigator("/login");
    }
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/appointments`)
      .then((response) => {
        setAppointmentsData(response.data.data);
      })
      .catch((error) =>
        toast({
          title: "Unable to fetch Data",
          description: "something went wrong when fetching appointments",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/dailyAppointments`)
      .then((response) => {
        setDailyAppointments(response.data.data);
      })
      .catch((error) =>
        toast({
          title: "Unable to fetch Data",
          description: "something went wrong when fetching appointments",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );
  }, []);

  const handleDelete = () => {
    axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/receptionist/deleteLastMonthAppointments`
      )
      .then((response) => {
        toast({
          title: "Success",
          description: "All appointments of last month are deleted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/appointments`)
          .then((response) => {
            setAppointmentsData(response.data.data);
          })
          .catch((error) => {
            toast({
              title: "Unable to fetch Data",
              description: "something went wrong when fetching appointments",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      })
      .catch((error) => {
        toast({
          title: "Unable to delete",
          description: "Something went wrong when deleting appointments",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const openPatientDetails = (patientName) => {
    if (toast.isActive("t1")) {
      toast.closeAll();
    }
    const [name, surname] = patientName.split(" ");
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/users/details/${name}%20${surname}`
      )
      .then((response) => {
        if (currentUser.role === "doctor") {
          navigator(`/user/doctor/patient/${name}%20${surname}`, {
            state: { data: response.data.data },
          });
        } else {
          navigator(`/user/receptionist/patient/${name}%20${surname}`, {
            state: { data: response.data.data },
          });
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            toast({
              id: "t1",
              title: "Bad Request",
              description: "Data not found",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            break;
          case 404:
            toast({
              id: "t1",
              title: "Not Found",
              description: "No data found for the following name",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            break;
          case 500:
            toast({
              id: "t1",
              title: "Internal Server Error",
              description: "Something went wrong when fetching appointments",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            break;
          default:
            toast({
              id: "t1",
              title: "Unable to fetch Data",
              description: "something went wrong when fetching appointments",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
        }
      });
  };

  const openUpdateDetails = (patientName) => {
    const [name, surname] = patientName.split(" ");
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/users/details/${name}%20${surname}`
      )
      .then((response) => {
        let endPoint =
          currentUser.role === "doctor"
            ? `/user/doctor/patient/${name}%20${surname}`
            : `/user/receptionist/patient/update/${name}%20${surname}`;
        navigator(endPoint, {
          state: { data: response.data.data },
        });
      })
      .catch((error) =>
        toast({
          title: "Unable to fetch Data",
          description: "something went wrong when fetching appointments",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      );
  };

  const filteredAppointments = appointmentsData.filter(({ patient_name }) => {
    return patient_name.toLowerCase().includes(searchKey.toLowerCase());
  });

  return (
    <Grid templateRows="5% 95%" flex={1}>
      <InputGroup
        width="100%"
        alignItems="center"
        display="flex"
        justifySelf="center"
        gap={3}
      >
        <Input
          type="text"
          fontSize="1.1rem"
          fontWeight="500"
          placeholder="Search Example: Name Surname"
          width="100%"
          flex={1}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </InputGroup>
      <Box h="100%" overflowY="auto">
        <Accordion allowToggle defaultIndex={[0]} p={10}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Daily Appointments
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <TableContainer m={3} rounded="md">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>SrNo</Th>
                      <Th>Name</Th>
                      <Th>Mobile</Th>
                      <Th>Gender</Th>
                      <Th>Age</Th>
                      <Th>Date</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dailyAppointments.map((appointment, index) => {
                      return (
                        <Tr
                          key={index}
                          position="relative"
                          _hover={{
                            cursor: "pointer",
                            bgColor: rowHoverBgColor,
                          }}
                        >
                          <Td>{index + 1}</Td>
                          <Td>{appointment.patient_name}</Td>
                          <Td>{appointment.mobile_no}</Td>
                          <Td>{appointment.gender}</Td>
                          <Td>{appointment.age}</Td>
                          <Td>{appointment.date_of_app.substring(0, 10)}</Td>
                          <Td>{appointment.time_of_app}</Td>
                          <Menu>
                            <MenuButton
                              position="absolute"
                              right="0"
                              top="0"
                              left="0"
                              bottom="0"
                              _active={{
                                bg: "cyan.50",
                                opacity: "0.5",
                              }}
                            ></MenuButton>
                            <MenuList
                              display="flex"
                              p={3}
                              gap={3}
                              position="absolute"
                              top={-5}
                            >
                              <Button
                                flex={1}
                                color="white"
                                colorScheme="cyan"
                                onClick={() => {
                                  openPatientDetails(appointment.patient_name);
                                }}
                              >
                                View
                              </Button>
                              {currentUser.role === "receptionist" && (
                                <Button
                                  flex={1}
                                  color="white"
                                  colorScheme="teal"
                                  onClick={() => {
                                    openUpdateDetails(appointment.patient_name);
                                  }}
                                >
                                  Update
                                </Button>
                              )}
                            </MenuList>
                          </Menu>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Other Appointments
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TableContainer m={3} rounded="md">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>SrNo</Th>
                      <Th>Name</Th>
                      <Th>Mobile</Th>
                      <Th>Gender</Th>
                      <Th>Age</Th>
                      <Th>Date</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredAppointments.map((appointment, index) => {
                      return (
                        <Tr
                          key={index}
                          _hover={{
                            bg: rowHoverBgColor,
                            cursor: "pointer",
                          }}
                          position="relative"
                        >
                          <Td>{index + 1}</Td>
                          <Td>{appointment.patient_name}</Td>
                          <Td>{appointment.mobile_no}</Td>
                          <Td>{appointment.gender}</Td>
                          <Td>{appointment.age}</Td>
                          <Td>{appointment.date_of_app.substring(0, 10)}</Td>
                          <Td>{appointment.time_of_app}</Td>
                          <Menu>
                            <MenuButton
                              position="absolute"
                              right="0"
                              top="0"
                              left="0"
                              bottom="0"
                              _hover={{
                                cursor: "pointer",
                              }}
                              _active={{
                                bg: "cyan.50",
                                opacity: "0.5",
                              }}
                            ></MenuButton>
                            <MenuList
                              display="flex"
                              p={3}
                              gap={3}
                              position="absolute"
                              top={-5}
                            >
                              <Button
                                color="white"
                                colorScheme="cyan"
                                onClick={() => {
                                  openPatientDetails(appointment.patient_name);
                                }}
                                flex={1}
                              >
                                View
                              </Button>
                              {currentUser.role === "receptionist" && (
                                <Button
                                  color="white"
                                  colorScheme="teal"
                                  onClick={() => {
                                    openUpdateDetails(appointment.patient_name);
                                  }}
                                  flex={1}
                                >
                                  Update
                                </Button>
                              )}
                            </MenuList>
                          </Menu>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box position="relative" color="red.500" fontWeight={500} padding="10">
          <Divider borderColor="red.500" />
          <AbsoluteCenter bg={appBgColor} px="4">
            Danger Zone
          </AbsoluteCenter>
        </Box>
        <Flex
          justify="center"
          align="center"
          direction="column"
          gap={4}
          m={5}
          p={3}
          bg="rgb(255,0,0,.2)"
        >
          <Text color="red.500">Delete All Appointments of last month</Text>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
};

export default Schedules;
