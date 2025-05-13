import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Box,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { useToast } from "@chakra-ui/react";

function AddPrescriptions({ patient_name }) {
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [isLoadingMedicine, setIsLoadingMedicine] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const { currentUser, setCurrentUser, expirationTime,inputBgColor } =
    useContext(GlobalContext);
  const toast = useToast();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser?.role != "receptionist") {
      toast({
        title: "Unauthorized Request",
        description: "Only receptionist can access this page.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigator("/login");
    } else if (Date.now() > expirationTime) {
      setCurrentUser(null);
      toast({
        title: "Token expired",
        description: "Login again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigator("/login");
    }
  }, []);

  const handleAddMedicine = () => {
    setIsLoadingMedicine(true);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/receptionist/addMedicine`, {
        patient_name,
        medicine_name: medicine,
        dosage,
      })
      .then((response) => {
        setError(false);
        setIsLoadingMedicine(false);
        setMedicine("");
        setDosage("");
        toast({
          title: "Success",
          description: "Medicine Details Stored",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setError(true);
        setIsLoadingMedicine(false);
        toast({
          title: "Error",
          description: "Medicine Details not stored",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleAddReport = () => {
    setIsLoadingReport(true);
    const formData = new FormData();
    formData.set("patient_name", patient_name);
    formData.set("report_name", reportName);
    formData.append("reportFile", reportFile);

    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/receptionist/addReport`,
        formData
      )
      .then((response) => {
        setError(false);
        setIsLoadingReport(false);
        toast({
          title: "Success",
          description: "Report Stored",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setError(true);
        setIsLoadingReport(false);
        toast({
          title: "Error",
          description: "Report not stored",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      width="100%"
      gap={10}
      h="100%"
      direction={{
        base: "column",
        md: "row",
        lg: "row",
        xl: "row",
      }}
    >
      <FormControl>
        <FormLabel fontSize="1.2rem">Medicines</FormLabel>
        <Grid gap="5px" justifyItems="center">
          <Input
            bg={inputBgColor}
            fontSize={{ base: "15px", md: "20px" }}
            type="text"
            placeholder="Enter Medicine name"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            isInvalid={error && !medicine}
            border="2px solid"
            borderColor="cyan.400"
          />
          <Textarea
            fontSize={{ base: "15px", md: "20px" }}
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            isInvalid={error && !dosage}
            border="2px solid"
            borderColor="cyan.400"
            h="100%"
            flex={1}
            bg={inputBgColor}
          />
          <Button
            colorScheme="cyan"
            color="white"
            onClick={handleAddMedicine}
            isLoading={isLoadingMedicine}
            loadingText={"Saving..."}
            border="2px solid"
            borderColor="cyan.400"
            width="100%"
          >
            Save
          </Button>
        </Grid>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="1.2rem">Reports</FormLabel>

        <Grid
          gap="5px"
          direction={{ md: "row", sm: "column", base: "column" }}
          justifyItems="center"
        >
          <Input
            bg={inputBgColor}
            fontSize={{ base: "15px", md: "20px" }}
            type="text"
            placeholder="Enter Report name"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            isInvalid={error && !reportName}
            border="2px solid"
            borderColor="cyan.400"
          />
          <Box
            border="2px solid"
            borderColor="cyan.400"
            w="100%"
            rounded="md"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={inputBgColor}
            h="100px"
          >
            <Input
              bg={inputBgColor}
              fontSize={{ base: "15px", md: "20px" }}
              type="file"
              onChange={(e) => setReportFile(e.target.files[0])}
              isInvalid={error && !reportFile}
              opacity={0}
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
            />
            {!reportFile && (
              <Text color="cyan.400">Drag or Click here to add file</Text>
            )}
            {reportFile && (
              <Text color="cyan.400">
                <Box>File Uploaded</Box>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setReportFile(null);
                  }}
                >
                  Cancel
                </Button>
              </Text>
            )}
          </Box>
          <Button
            colorScheme="cyan"
            color="white"
            onClick={handleAddReport}
            isLoading={isLoadingReport}
            loadingText={"Saving..."}
            border="2px solid"
            borderColor="cyan.400"
            w="100%"
          >
            Save
          </Button>
        </Grid>
      </FormControl>
    </Flex>
  );
}

export default AddPrescriptions;
