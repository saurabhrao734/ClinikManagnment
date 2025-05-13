import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext"
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios"
const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser, setCurrentUser, expirationTime } = useContext(GlobalContext);
  const navigator = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if(!currentUser) toast({
      title: 'Unauthorized request',
      description: "Login to access this page",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
    if(Date.now() > expirationTime) {
      setCurrentUser(null);
      navigator("/login")
    }
  }, [])

  const handleResetPassword = () => {
    if(newPassword === '' || confirmPassword === '') {
      toast({
        title: 'Error',
        description: "All fields required.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      }) 
    }
    else if(newPassword !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: "New password and confirm password must be same.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/changePassword`, {
      oldPassword,
      newPassword
    })
    .then(response => {
      setNewPassword("");
      setConfirmPassword("");
      toast({
        title: 'Success',
        description: "Password changed successfully",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch(error => {
      if(error.response.status == 400) toast({
        title: 'Invalid Password',
        description: "Please enter correct password",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      else toast({
        title: 'Server error',
        description: "Something went wrong.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
    }
    
  }


  return (
    <>
      <Box maxW="md" mx="auto" mt={8} p={4}>
        <FormControl>
          <FormLabel>Old Password</FormLabel>
          <Input type="password" placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input type="password" placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button mt={4} colorScheme="blue"
        onClick={handleResetPassword}
        >
          Reset Password
        </Button>
      </Box>
    </>
  );
};

export default ResetPassword;
