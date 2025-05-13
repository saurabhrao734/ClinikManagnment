import {
  Grid,
  InputGroup,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  FormControl,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import {
  isValidAge,
  isValidFullName,
  isValidMobileNo,
} from "../helpers/formValidationHelpers";

const AddAppointment = () => {
  const [patient_name, setPatientName] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date_of_app, setDateOfApp] = useState("");
  const [time_of_app, setTimeOfApp] = useState("");
  const navigator = useNavigate();
  const toast = useToast();
  const { currentUser, expirationTime, setCurrentUser,formBgColor,inputBgColor } =
    useContext(GlobalContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser?.role !== "receptionist") {
      toast({
        title: "Unauthorized Request",
        description: "Login to access this page.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigator("/login");
    } else if (Date.now() > expirationTime) {
      setCurrentUser("");
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

  const handleAddAppointment = () => {
    setIsLoading(true);
    if (
      isValidAge(age) &&
      isValidMobileNo(mobile_no) &&
      isValidFullName(patient_name)
    ) {
      const time = time_of_app.split(":");
      let isPm = false;
      if (time[0] > 12) {
        time[0] -= 12;
        isPm = true;
      }
      let newTime = time[0] + ":" + time[1];
      if (isPm) newTime += " PM";
      else newTime += " AM";
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/receptionist/addAppointment`,
          {
            patient_name,
            mobile_no,
            age,
            gender,
            date_of_app,
            time_of_app: newTime,
          }
        )
        .then((response) => {
          setIsLoading(false);
          setError(false);
          setPatientName("");
          setAge(0);
          setDateOfApp("");
          setTimeOfApp("");
          setGender("");
          setMobileNo("");
          toast({
            title: "Booked",
            description: "Appointment booked successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
          if (error.response?.status === 400) {
            toast({
              title: "Bad request",
              description: "All fields are required",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else if (error.response?.status === 409) {
            toast({
              title: "Bad request",
              description: "Appointment already booked",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Server error",
              description: "Something went wrong",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        });
    } else {
      if (!isValidAge(age)) setAge(0);
      if (!isValidMobileNo(mobile_no)) setMobileNo("");
      if (!isValidFullName(patient_name)) setPatientName("");
      
      setError(true);
      setIsLoading(false);
      toast({
        title: "Invalid Data",
        description: "Please enter valid data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid
      borderRadius="20px"
      color="cyan.700"
      justifyContent="center"
      align="center"
      p={5}
    >
      <Heading>Add Appointments</Heading>
      <Grid w="100%" h="90%" gap={4} bgColor={formBgColor} p={10}>
        <FormControl>
          <FormLabel fontSize="18px" m={0}>
            Name
          </FormLabel>
          <InputGroup>
            <Input
              fontSize="18px"
              width="100%"
              type="text"
              bgColor={inputBgColor}
              
              placeholder="Enter name"
              borderRadius="10px"
              value={patient_name}
              onChange={(e) => setPatientName(e.target.value)}
              isInvalid={error && !patient_name}
              borderColor="cyan.400"
              borderWidth="2px"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="18px" m={0}>
            Mobile
          </FormLabel>
          <InputGroup>
            <Input
              fontSize="18px"
              width="100%"
              type="text"
              bgColor={inputBgColor}
              
              placeholder="Enter Mobile no"
              borderRadius="10px"
              value={mobile_no}
              onChange={(e) => setMobileNo(e.target.value)}
              isInvalid={
                (error && !mobile_no) || (error && !isValidMobileNo(mobile_no))
              }
              borderColor="cyan.400"
              borderWidth="2px"
            />
          </InputGroup>
        </FormControl>
        <VStack>
          <Flex width="100%" gap={3}>
            <FormControl>
              <FormLabel fontSize="18px" m={0}>
                Age
              </FormLabel>
              <InputGroup>
                <Input
                  fontSize="18px"
                  width="100%"
                  bgColor={inputBgColor}
                  
                  borderRadius="10px"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  isInvalid={(error && !age) || (error && !isValidAge(age))}
                  type="number"
                  borderColor="cyan.400"
                  borderWidth="2px"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="18px" m={0}>
                Gender
              </FormLabel>
              <InputGroup>
                <Select
                  fontSize="18px"
                  width="100%"
                  placeholder="Select Gender"
                  bgColor={inputBgColor}
                  
                  borderRadius="10px"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  isInvalid={error && !gender}
                  borderColor="cyan.400"
                  borderWidth="2px"
                >
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex width="100%" gap={3}>
            <FormControl>
              <FormLabel fontSize="18px" m={0}>
                Date
              </FormLabel>
              <InputGroup>
                <Input
                  fontSize="18px"
                  width="100%"
                  placeholder="Select Date"
                  size="md"
                  type="date"
                  bgColor={inputBgColor}
                  
                  borderRadius="10px"
                  value={date_of_app}
                  onChange={(e) => setDateOfApp(e.target.value)}
                  isInvalid={error && !date_of_app}
                  borderColor="cyan.400"
                  borderWidth="2px"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="18px" m={0}>
                Time
              </FormLabel>
              <InputGroup>
                <Input
                  fontSize="18px"
                  width="100%"
                  placeholder="Select Time"
                  size="md"
                  type="time"
                  bgColor={inputBgColor}
                  
                  borderRadius="10px"
                  value={time_of_app}
                  onChange={(e) => setTimeOfApp(e.target.value)}
                  isInvalid={error && !time_of_app}
                  borderColor="cyan.400"
                  borderWidth="2px"
                />
              </InputGroup>
            </FormControl>
          </Flex>
        </VStack>
        <Button
          colorScheme="cyan"
          onClick={handleAddAppointment}
          isLoading={isLoading}
          loadingText={"Saving Details..."}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddAppointment;
