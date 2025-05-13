import {
  Box,
  Grid,
  Input,
  InputGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
// import patientsData from "./data/patients.data";
import { Search2Icon } from "@chakra-ui/icons";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

const PatientsHistory = () => {
  const [patientsHistory, setPatientsHistory] = useState([]);
  const { currentUser, rowHoverBgColor } = useContext(GlobalContext);
  const toast = useToast();
  const navigator = useNavigate();
  const [searchKey, setSearchKey] = useState("");

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
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/allPatientDetails`)
      .then((response) => setPatientsHistory(response.data.data))
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

  const openPatientDetails = (patientName) => {
    if (toast.isActive("t1")) {
      toast.closeAll();
    }
    const [name, surname] = patientName.split(" ");
    axios
      .get(`http://localhost:5000/api/v1/users/details/${name}%20${surname}`)
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
      .get(`http://localhost:5000/api/v1/users/details/${name}%20${surname}`)
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

  const filteredData = patientsHistory.filter(({ patient_name }) => {
    return patient_name.toLowerCase().includes(searchKey.toLowerCase());
  });

  return (
    <Grid templateRows="5% 95%" flex={1}>
      <InputGroup
        width="100%"
        alignItems="center"
        display="flex"
        justifySelf="center"
        p="10px"
        gap={3}
      >
        <Input
          type="text"
          fontSize="1.1rem"
          fontWeight="500"
          placeholder="Search Example: Name Surname"
          p="10px"
          width="100%"
          flex={1}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </InputGroup>
      <Box h="100%" >
        <TableContainer h="100%" overflowY="auto">
          <Table variant="simple" my={4}>
            <Thead>
              <Tr>
                <Th>Sr.No.</Th>
                <Th>Name</Th>
                <Th>Mobile</Th>
                <Th>Symptoms</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((Patient, index) => {
                return (
                  <Tr
                    key={index}
                    _hover={{
                      bg: rowHoverBgColor,
                    }}
                    position="relative"
                  >
                    <Td>{index + 1}</Td>
                    <Td>{Patient.patient_name}</Td>
                    <Td>{Patient.mobile_no}</Td>
                    <Td>{Patient.symptoms}</Td>
                    <Td>
                      {Patient.last_visited?.substring(0, 10) || "Not visited"}
                    </Td>
                    <Td>
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
                        <MenuList display="flex" p={3} gap={3} position="absolute" top={-3} zIndex={9999}>
                          <Button
                            color="white"
                            colorScheme="cyan"
                            onClick={() => {
                              openPatientDetails(Patient.patient_name);
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
                                openUpdateDetails(Patient.patient_name);
                              }}
                              flex={1}
                            >
                              Update
                            </Button>
                          )}
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default PatientsHistory;
