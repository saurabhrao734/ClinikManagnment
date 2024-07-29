import {
  Box,
  Image,
  Grid,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";

const PatientData = () => {
  const location = useLocation();
  const [searchedData, setSearchedData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setSearchedData(location.state.data);
    }
  }, [location]);

  return (
    <Box w="100%" flex={1} overflowY="scroll">
      <Box p={10}>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          {searchedData !== null ? searchedData?.patient_name : ""}
        </Text>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td fontWeight="bold" fontSize="1.3rem">
                Age
              </Td>
              <Td>{searchedData !== null ? searchedData?.age : ""}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" fontSize="1.3rem">
                Weight
              </Td>
              <Td>{searchedData !== null ? searchedData?.weight : ""}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" fontSize="1.3rem">
                Gender
              </Td>
              <Td>{searchedData !== null ? searchedData?.gender : ""}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" fontSize="1.3rem">
                Symptoms
              </Td>
              <Td>{searchedData !== null ? searchedData?.symptoms : ""}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" fontSize="1.3rem">
                Prescriptions
              </Td>
              <Td>
                <Table variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th>Medicine Name</Th>
                      <Th>Dosage</Th>
                    </Tr>
                  </Thead>
                  {searchedData !== null
                    ? searchedData?.prescriptions?.map(
                        (prescription, index) => {
                          return (
                            <Tr key={index} gap={3}>
                              <Td>{prescription.medicine_name}</Td>
                              <Td>{prescription.dosage}</Td>
                            </Tr>
                          );
                        }
                      )
                    : ""}
                </Table>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Box mt={4}>
          <Text fontWeight="bold" fontSize="xl" mb={4}>
            Reports
          </Text>
          <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
            {searchedData !== null
              ? searchedData.report.map((repo, index) => {
                  return (
                    <Grid key={index} placeItems="center" gap={3}>
                      <Text textAlign="center" fontWeight="bold">
                        {repo.report_name.toUpperCase()}
                      </Text>
                      <Image src={repo.url} width="80%" />
                      <Button
                        colorScheme="cyan"
                        color="white"
                        as={Link}
                        textAlign="center"
                        verticalAlign="center"
                        href={repo.url}
                      >
                        View Report <ExternalLinkIcon ml={3} />
                      </Button>
                    </Grid>
                  );
                })
              : ""}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientData;
