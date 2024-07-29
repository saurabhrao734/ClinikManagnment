import {
    Flex,
    Input,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  } from "@chakra-ui/react";
  import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import AddPatientDetails from "./forms/AddPatientDetails.jsx";
import AddPrescriptions from "./forms/AddPrescriptions.jsx";
import AddBilling from "./forms/AddBilling.jsx";
  
  function UpdateDetails() {
    const [patient_name, setPatientName] = useState("");
    const [mobile_no, setMobileNo] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const location = useLocation();
    const [searchedData,setSearchedData] = useState(null);
    const { currentUser, setCurrentUser, expirationTime } =
    useContext(GlobalContext);
    
    useEffect(() => {
      if(location.state){
        setSearchedData(location.state.data);
        setPatientName(location.state.data.patient_name);
        setMobileNo(location.state.data.mobile_no);
        setSymptoms(location.state.data.symptoms)
      }
    },[location]);

    return (
      <Flex direction="column"   top={0}>
        <Tabs variant="enclosed" align="center">
          
          <TabPanels >
            <TabPanel>
              <Flex justifyContent="center">
                {searchedData && <AddPatientDetails patientsObject={searchedData}
                />}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                {searchedData && <AddPrescriptions patient_name={patient_name} />}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="center">
                {searchedData && <AddBilling patient_name={patient_name} />}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    );
  }
  
  export default UpdateDetails;
  