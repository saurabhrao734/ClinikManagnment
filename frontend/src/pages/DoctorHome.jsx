import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
  Link,

} from "@chakra-ui/react";
import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
const DoctorHome = () => {
  const {
    currentUser,
    setCurrentUser,
    expirationTime,
    sidebarMenuBgColor,
    sidebarBgColor
  } = useContext(GlobalContext);
  const navigator = useNavigate();
  const toast = useToast();

  
  
  useEffect(() => {
    if (!currentUser || currentUser.role !== "doctor")
      toast({
        title: "Invalid Role.",
        description: "Only doctor can access this page.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    if (Date.now() > expirationTime) {
      setCurrentUser(null);
      navigator("/login");
    }
  }, []);

  const tabs = [
    { name: "Dashboard", path: "/user/doctor/dashboard" },
    { name: "Schedules", path: "/user/doctor/schedules" },
    { name: "Patients", path: "/user/doctor/patients" },
  ];

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "minmax(200px,17%) auto",
        lg: "minmax(200px,17%) auto",
        xl: "minmax(200px,17%) auto",
      }}
      h="100svh"
     
    >
      <Box
        zIndex={2}
        display={{
          base: "none",
          lg: "block",
          xl: "block",
          md: "block",
        }}
        bg={sidebarBgColor}
      >
        <Text
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          py={5}
          fontSize="1.3rem"
          bgColor={sidebarMenuBgColor}
        >
          <HamburgerIcon />
          Menu
        </Text>
        {/* <Divider orientation="horizontal" my={3} borderWidth={2} /> */}
        <Flex direction="column" >
          {tabs.map((tab, index) => (
            <Link
              to={tab.path}
              key={index}
              as={NavLink}
              _activeLink={{
                bgColor: "cyan.50",
                color: "cyan.600",
              }}
              p={3}
              textAlign="center"
              fontWeight={600}
              fontSize="1.2rem"
              color="white"
              _hover={{
                textDecoration: "none",
              }}
            >
              {tab.name}
            </Link>
          ))}
        </Flex>
      </Box>
      <Grid
        zIndex={1}
        px={{ base: 0, md: 10, lg: 10, xl: 10 }}
        templateRows={{
          base: "auto auto",
          md: "10svh 90svh",
          lg: "10svh 90svh",
          xl: "10svh 90svh",
        }}
       
      >
        <Header role="doctor" />
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default DoctorHome;
