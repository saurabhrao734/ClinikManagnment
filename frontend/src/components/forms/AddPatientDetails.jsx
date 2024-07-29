import {
  Flex,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import AddPatientInfo from "./AddPatientInfo.jsx";
import Prescriptions from "./AddPrescriptions.jsx";
import AddBillingInfo from "./AddBilling.jsx";
import { useEffect, useState,useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function AddPatientDetails({patientsObject}) {
  const [patient_name, setPatientName] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const { formBgColor } = useContext(GlobalContext);
  useEffect(() => {
    if(patientsObject) {
      setPatientName(patientsObject.patient_name);
      setMobileNo(patientsObject.mobile_no);
      setSymptoms(patientsObject.symptoms)
    }
  }, [])
  return (
    <Flex w="100%" direction="column">
      <Flex
        direction={{ md: "row", sm: "column", base: "column" }}
        p="10px"
        gap="10px"
        alignItems="center"
      >
        <Flex
          height="100%"
          width="100%"
          gap={3}
          p="10px"
          justifyItems="center"
        >
          <Input
            fontSize="1.1rem"
            type="text"
            placeholder="Name Surname"
            value={patient_name}
            readOnly
          />
          <Input
            fontSize="1.1rem"
            type="text"
            placeholder="Mobile"
            value={mobile_no}
            readOnly
          />
          <Input
            fontSize="1.1rem"
            type="text"
            placeholder="Symptoms"
            value={symptoms}
            readOnly
          />
        </Flex>
      </Flex>
      <Tabs variant="soft-rounded" h="100%" gap={3} align="center" display="flex" flexDirection="column">
        <TabList>
          <Tab
            fontSize="20px"
            fontWeight="500"
            color="cyan.800"
            _selected={{ bg: "cyan.200" }}
          >
            Patient Details
          </Tab>
          <Tab
            fontSize="20px"
            fontWeight="500"
            color="cyan.800"
            _selected={{ bg: "cyan.200" }}
          >
            Prescriptions
          </Tab>
          <Tab
            fontSize="20px"
            fontWeight="500"
            color="cyan.800"
            _selected={{ bg: "cyan.200" }}
          >
            Billing Details
          </Tab>
        </TabList>
        <TabPanels flex={1} bgColor={formBgColor}>
          <TabPanel>
            <Flex justifyContent="center">
              <AddPatientInfo
                patient_name={patient_name}
                setPatientName={setPatientName}
                mobile_no={mobile_no}
                setMobileNo={setMobileNo}
                symptoms={symptoms}
                setSymptoms={setSymptoms}
                patientsObject={patientsObject}
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center">
              <Prescriptions patient_name={patient_name} patientsObject={patientsObject} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center">
              <AddBillingInfo patient_name={patient_name} patientsObject={patientsObject}/>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default AddPatientDetails;
