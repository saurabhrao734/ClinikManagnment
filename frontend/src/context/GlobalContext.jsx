import { createContext, useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

export const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [expirationTime, setExpirationTime] = useState(Number(localStorage.getItem("expirationTime")))
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("expirationTime", expirationTime);
  }, [currentUser]) 

  const sidebarMenuBgColor = useColorModeValue("cyan.500", "gray.600");
  const sidebarBgColor = useColorModeValue("cyan.400", "gray.700");
  const sidebarLinkActiveBgColor = useColorModeValue("cyan.50", "gray.200");
  const sidebarLinkActiveColor = useColorModeValue("cyan.500", "gray.600");
  const appBgColor = useColorModeValue("white", "gray.800");
  const rowHoverBgColor = useColorModeValue("cyan.50", "gray.700");
  const formBgColor = useColorModeValue("cyan.50", "gray.900");
  const inputBgColor = useColorModeValue("white", "gray.800");

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        expirationTime,
        setExpirationTime,
        activeTab,
        setActiveTab,
        sidebarMenuBgColor,
        sidebarBgColor,
        sidebarLinkActiveBgColor,
        sidebarLinkActiveColor,
        appBgColor,
        rowHoverBgColor,
        formBgColor,
        inputBgColor
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export default GlobalProvider;
