import {
  Flex,
  Button,
  Box,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Avatar,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Text,
  Switch,
} from "@chakra-ui/react";

import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast, useColorMode } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
axios.defaults.withCredentials = true;
const Header = () => {
  const { currentUser, setCurrentUser, setExpirationTime } =
    useContext(GlobalContext);
  const navigator = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/logout`, {
        credentials: "include",
      })
      .then((response) => {
        setIsLoading(false);
        setCurrentUser(null);
        setExpirationTime(0);
        toast({
          title: "Logout successfull.",
          description: "You are logged out from your account",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigator("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "Logout Failed.",
          description: "Unauthorized request",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const doctorTabs = [
    { name: "Dashboard", path: "/user/doctor/dashboard" },
    { name: "Schedules", path: "/user/doctor/schedules" },
    { name: "Patients", path: "/user/doctor/patients" },
  ];

  const receptionistTabs = [
    { name: "Add Appointment", path: "/user/receptionist/appointment" },
    { name: "Appointments", path: "/user/receptionist/all-appointments" },
    { name: "Add Patient Details", path: "/user/receptionist/add-details" },
    { name: "Patient Details", path: "/user/receptionist/patients" },
  ];

  return (
    <>
      {/* <Box> */}
      <Flex
        align="center"
        justify="flex-end"
        py={4}
        gap={8}
        display={{
          base: "none",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
      >
        <Flex gap={10}>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
            >
              <Flex align="center">
                <Avatar boxSize="40px" src={currentUser?.avatar} />
                <Box ml={2} fontSize="1.1rem" color="cyan.600">
                  {currentUser?.fullname}
                </Box>
              </Flex>
            </MenuButton>
            <MenuList m={0} p={0}>
              <NavLink to="/edit-profile">
                <MenuItem>Edit Profile</MenuItem>
              </NavLink>
              <NavLink to="/reset-password">
                <MenuItem>Reset Password</MenuItem>
              </NavLink>
              <Flex
                justify="center"
                align="center"
                gap={3}
                p={3}
                bgColor="rgb(0,0,0,.1)"
              >
                <Text>Dark Mode</Text>{" "}
                <Switch
                  
                  size="md"
                  onChange={toggleColorMode}
                  isChecked={colorMode === "dark"}
                />
              </Flex>
            </MenuList>
          </Menu>
          <Button
            colorScheme="red"
            onClick={handleLogout}
            isLoading={isLoading}
            loadingText="Logging out"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
      {/* <Divider orientation="horizontal" borderWidth={1} /> */}
      {/* </Box> */}
      <Accordion
        allowToggle
        bgColor="white"
        display={{ base: "block", md: "none", lg: "none", xl: "none" }}
      >
        <AccordionItem border={0}>
          <AccordionButton
            justifyContent="space-between"
            p={6}
            bgColor="cyan.400"
            color="white"
            _hover={{
              bgColor: "cyan.600",
            }}
          >
            <Text>Menu</Text>
            <Box>
              <FaBars fontSize="1.5rem" />
            </Box>
          </AccordionButton>

          <AccordionPanel>
            <Flex direction="column" gap={2}>
              <Flex
                alignSelf="center"
                rounded="full"
                justify="center"
                w="100%"
                align="center"
                p="3"
                bgColor="cyan.50"
              >
                <Avatar
                  boxSize="40px"
                  src={
                    currentUser?.avatar
                      ? currentUser.avatar
                      : "https://bit.ly/broken-link"
                  }
                />
                <Box ml={2} fontSize="1.1rem" color="cyan.600">
                  {currentUser?.fullname}
                </Box>
              </Flex>
              {currentUser?.role === "doctor" &&
                doctorTabs.map((tab, index) => (
                  <Link
                    to={tab.path}
                    key={index}
                    as={NavLink}
                    _activeLink={{
                      bgColor: "cyan.400",
                      color: "white",
                    }}
                    p={5}
                    _hover={{
                      textDecoration: "none",
                    }}
                    fontWeight={600}
                    fontSize="1.2rem"
                    rounded="md"
                    textAlign="center"
                  >
                    {tab.name}
                  </Link>
                ))}
              {currentUser?.role === "receptionist" &&
                receptionistTabs.map((tab, index) => (
                  <Link
                    to={tab.path}
                    key={index}
                    as={NavLink}
                    _activeLink={{
                      bgColor: "cyan.400",
                      color: "white",
                    }}
                    _hover={{
                      textDecoration: "none",
                    }}
                    p={3}
                    fontWeight={600}
                    fontSize="1.2rem"
                    rounded="md"
                    textAlign="center"
                  >
                    {tab.name}
                  </Link>
                ))}
              <Button
                colorScheme="red"
                isLoading={isLoading}
                onClick={handleLogout}
                loadingText="Logging out"
              >
                Logout
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Header;
