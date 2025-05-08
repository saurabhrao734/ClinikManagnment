import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import DoctorHome from "./pages/DoctorHome";
import Schedules from "./components/Schedules";
import ResetPassword from "./components/forms/ResetPassword";
import Dashboard from "./components/Dashboard";
import GlobalProvider from "./context/GlobalContext";
import ReceptionistHome from "./pages/ReceptionistHome";
import AddBilling from "./components/forms/AddBilling";
import AddAppointment from "./components/forms/AddAppointment";
import PatientsHistory from "./components/PatientsHistory";
// import Patient_Detail from "./components/Patient_Detail";
import ProfileForm from "./components/forms/ProfileForm";
// import Reciept from "./pages/Reciept";
import PatientData from "./components/PatientData";
import AddPatientDetails from "./components/forms/AddPatientDetails";
import UpdateDetails from "./components/UpdateDetails";
import Register from "./pages/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/edit-profile",
    element: <ProfileForm />,
  },
  {
    path: "/user/doctor",
    element: <DoctorHome />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "schedules",
        element: <Schedules />,
      },
      {
        path: "patients",
        element: <PatientsHistory />,
      },
      {
        path: "patient/:id",
        element: <PatientData />,
      },
    ],
  },
  {
    path: "/user/receptionist",
    element: <ReceptionistHome />,
    children: [
      {
        path: "AddBilling",
        element: <AddBilling />,
      },
      {
        path: "appointment",
        element: <AddAppointment />,
      },
      {
        path: "add-details",
        element: <AddPatientDetails />,
      },
      {
        path: "all-appointments",
        element: <Schedules />,
      },
      {
        path: "patient/:id",
        element: <PatientData />,
      },
      {
        path: "patients",
        element: <PatientsHistory />,
      },
      {
        path: "patient/update/:id",
        element: <UpdateDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <GlobalProvider>
      <RouterProvider router={routes} />
    </GlobalProvider>
  );
}

export default App;
