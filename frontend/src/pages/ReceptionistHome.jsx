import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import clinicImg from "../assets/clinic.jpeg";
import Header from "../components/Header";
import { GlobalContext } from "../context/GlobalContext";
import { useState, useContext, useEffect } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

const ReceptionistHome = () => {
  const {
    currentUser,
    expirationTime,
    sidebarMenuBgColor,
    sidebarBgColor,
    sidebarLinkActiveBgColor,
    sidebarLinkActiveColor,
    appBgColor,
  } = useContext(GlobalContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "receptionist")
      navigator("/login");
    if (Date.now() > expirationTime) navigator("/login");
  }, []);

  const tabs = [
    { name: "Add Appointment", path: "/user/receptionist/appointment" },
    { name: "Appointments", path: "/user/receptionist/all-appointments" },
    { name: "Add Patient Details", path: "/user/receptionist/add-details" },
    { name: "Patient Details", path: "/user/receptionist/patients" },
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
      bgColor={sidebarBgColor}
    >
      <Box
        zIndex={2}
        display={{
          base: "none",
          lg: "block",
          xl: "block",
          md: "block",
        }}
      >
        <Text
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          py={5}
          fontSize="1.3rem"
          bg={sidebarMenuBgColor}
        >
          <HamburgerIcon />
          Menu
        </Text>
        {/* <Divider orientation="horizontal" my={3} borderWidth={2} /> */}
        <Flex direction="column">
          {tabs.map((tab, index) => (
            <Link
              to={tab.path}
              key={index}
              as={NavLink}
              _activeLink={{
                bgColor: sidebarLinkActiveBgColor,
                color: sidebarLinkActiveColor,
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
        bg={appBgColor}
      >
        <Header role="doctor" />

        <Outlet />
      </Grid>
    </Grid>
  );
};

export default ReceptionistHome;
